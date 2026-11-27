import { readFileSync } from 'node:fs';
export const SITE_ORIGIN = readFileSync('src/data/site.ts', 'utf8').match(/url: '(https:\/\/getterritorysignals[^']+)'/)[1];
