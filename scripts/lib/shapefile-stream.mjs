// Minimal streaming readers for the .shp and .dbf members of a zipped shapefile. Nothing is extracted to disk.
import { spawn } from 'node:child_process';

async function* chunksOf(zip, member) {
  const child = spawn('unzip', ['-p', zip, member], { stdio: ['ignore', 'pipe', 'inherit'] });
  const exit = new Promise((resolve) => child.on('close', resolve));
  let finished = false;
  try {
    yield* child.stdout;
    finished = true;
    const code = await exit;
    if (code !== 0) throw new Error(`unzip exited ${code} for ${member}`);
  } finally {
    if (!finished) child.kill();
  }
}

/** Calls sizes(buffer) to learn how many bytes the next piece needs, then yields exactly that many. */
async function* pieces(zip, member, headerBytes, sizes) {
  let pending = Buffer.alloc(0);
  let skip = null;
  for await (const chunk of chunksOf(zip, member)) {
    pending = pending.length ? Buffer.concat([pending, chunk]) : chunk;
    let at = 0;
    if (skip === null) {
      if (pending.length < headerBytes(pending)) continue;
      skip = headerBytes(pending);
      yield { header: pending.subarray(0, skip) };
      at = skip;
    }
    for (;;) {
      const size = sizes(pending, at);
      if (size === null || at + size > pending.length) break;
      yield { record: pending.subarray(at, at + size) };
      at += size;
    }
    pending = pending.subarray(at);
  }
}

/** Yields { index, bbox, rings() } for every polygon record. */
export async function* readPolygons(zip, member) {
  let index = 0;
  const size = (b, at) => (at + 8 > b.length ? null : 8 + b.readInt32BE(at + 4) * 2);
  for await (const { record } of pieces(zip, member, (b) => (b.length < 100 ? Infinity : 100), size)) {
    if (!record) continue;
    const body = record.subarray(8);
    const i = index++;
    if (body.readInt32LE(0) === 0) continue;
    const bbox = [4, 12, 20, 28].map((o) => body.readDoubleLE(o));
    yield {
      index: i,
      bbox,
      rings() {
        const parts = body.readInt32LE(36);
        const points = body.readInt32LE(40);
        const starts = Array.from({ length: parts }, (_, p) => body.readInt32LE(44 + p * 4));
        const base = 44 + parts * 4;
        return starts.map((start, p) => {
          const end = p + 1 < parts ? starts[p + 1] : points;
          return Array.from({ length: end - start }, (_, n) => [body.readDoubleLE(base + (start + n) * 16), body.readDoubleLE(base + (start + n) * 16 + 8)]);
        });
      },
    };
  }
}

/** Returns Map(index -> row) holding only the requested columns of the requested record indexes. */
export async function readRows(zip, member, wanted, columns) {
  const rows = new Map();
  const last = Math.max(...wanted);
  let fields;
  let length;
  let index = 0;
  for await (const piece of pieces(zip, member, (b) => (b.length < 12 ? Infinity : b.readUInt16LE(8)), () => length)) {
    if (piece.header) {
      length = piece.header.readUInt16LE(10);
      let offset = 1;
      fields = new Map();
      for (let at = 32; piece.header[at] !== 0x0d; at += 32) {
        const name = piece.header.toString('latin1', at, at + 11).replace(/\0.*$/, '');
        const width = piece.header[at + 16];
        fields.set(name, [offset, width]);
        offset += width;
      }
      for (const c of columns) if (!fields.has(c)) throw new Error(`no column ${c}; have ${[...fields.keys()].join(', ')}`);
      continue;
    }
    if (wanted.has(index)) {
      rows.set(index, Object.fromEntries(columns.map((c) => {
        const [offset, width] = fields.get(c);
        return [c, piece.record.toString('latin1', offset, offset + width).trim()];
      })));
    }
    if (index++ >= last) break;
  }
  return rows;
}
