/** Build-time access to the precomputed planning-area paths (scripts/build-map-paths.mjs). */
import map from '../data/map-paths.json';
export const PLANNING_AREAS = map;
export const MAP_SOURCE = {
  label: 'SANDAG community planning areas (Community_Plan_SD)',
  url: 'https://geo.sandag.org/server/rest/directories/downloads/Community_Plan_SD.geojson',
} as const;
export const PARCEL_SOURCE = {
  label: 'SanGIS parcels',
  url: 'https://gis-sangis1.hub.arcgis.com/pages/download-data',
} as const;
