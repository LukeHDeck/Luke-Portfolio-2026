/**
 * Mapbox GL JS - public token from Vite (set in .env.local as VITE_MAPBOX_TOKEN).
 * @see https://docs.mapbox.com/help/getting-started/access-tokens/
 */
export const MAPBOX_TOKEN = String(import.meta.env.VITE_MAPBOX_TOKEN ?? '').trim();

export const MAPBOX_STYLE = 'mapbox://styles/deckdog/cmikq7w36000v01s03jrwbymo';

export function hasMapboxToken() {
  return MAPBOX_TOKEN.length > 0;
}
