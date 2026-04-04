import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_TOKEN, MAPBOX_STYLE, hasMapboxToken } from '../config/mapbox';

/**
 * Custom hook for Mapbox GL JS map initialization and lifecycle management.
 *
 * Handles:
 * - Map creation with globe projection
 * - Atmosphere/fog setup
 * - Load and error state tracking
 * - Cleanup via map.remove() on unmount
 *
 * @param {React.RefObject} containerRef - Ref to the DOM element for the map
 * @param {Object} options - Mapbox Map constructor options (center, zoom, etc.)
 * @returns {{ mapRef, mapLoaded, mapError }}
 */
export function useMapbox(containerRef, options = {}) {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Bail out if WebGL isn't supported
    if (!mapboxgl.supported()) {
      setMapError('WebGL is not supported by your browser.');
      return;
    }

    if (!hasMapboxToken()) {
      setMapError(
        'Missing Mapbox token. Create .env.local in the project root with VITE_MAPBOX_TOKEN=your_public_token (see account.mapbox.com). Restart the dev server after saving.',
      );
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAPBOX_STYLE,
      projection: 'globe',
      center: options.center || [0, 20],
      zoom: options.zoom || 2,
      pitch: options.pitch || 0,
      bearing: options.bearing || 0,
      interactive: options.interactive !== undefined ? options.interactive : true,
      attributionControl: false,
      hash: false,
      fadeDuration: 0,
    });


    // Track load completion
    map.on('load', () => {
      setMapLoaded(true);
    });

    // Track errors
    map.on('error', (e) => {
      console.error('Mapbox error:', e.error);
      setMapError(e.error?.message || 'Map failed to load.');
    });

    mapRef.current = map;

    // Cleanup: destroy map on unmount
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { mapRef, mapLoaded, mapError };
}
