import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { startSpinAnimation, adjustSpinSpeed } from '../utils/mapHelpers';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const MAPBOX_STYLE = 'mapbox://styles/deckdog/cmikq7w36000v01s03jrwbymo';

/**
 * Decorative globe component for the landing page.
 * Non-interactive (no pan/zoom/tilt), auto-rotates continuously.
 * Responds to hover state from the Landing parent:
 *   - 'globe': speeds up rotation, slight zoom in
 *   - 'scroll': slows rotation, slight dim
 *   - 'none': default spin speed
 */
function Globe({ hoverState = 'none' }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const stopSpinRef = useRef(null);

  // Initialize map on mount
  useEffect(() => {
    if (!containerRef.current) return;
    if (!mapboxgl.supported()) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAPBOX_STYLE,
      projection: 'globe',
      center: [0, 20],
      zoom: 1.5,
      interactive: false,
      attributionControl: false,
      hash: false,
      fadeDuration: 0,
    });

    map.on('load', () => {
      // Start default spin animation
      stopSpinRef.current = startSpinAnimation(map, 120);
    });

    mapRef.current = map;

    return () => {
      if (stopSpinRef.current) stopSpinRef.current();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // React to hover state changes from Landing parent
  useEffect(() => {
    const map = mapRef.current;
    if (!map || map._removed || !stopSpinRef.current) return;

    switch (hoverState) {
      case 'globe':
        // Speed up rotation and zoom in slightly
        stopSpinRef.current = adjustSpinSpeed(map, stopSpinRef.current, 60);
        map.easeTo({ zoom: 2.0, pitch: 15, duration: 800 });
        break;

      case 'scroll':
        // Slow down rotation
        stopSpinRef.current = adjustSpinSpeed(map, stopSpinRef.current, 240);
        map.easeTo({ zoom: 1.3, pitch: 0, duration: 800 });
        break;

      default:
        // Return to default
        stopSpinRef.current = adjustSpinSpeed(map, stopSpinRef.current, 120);
        map.easeTo({ zoom: 1.5, pitch: 0, duration: 800 });
        break;
    }
  }, [hoverState]);

  return (
    <div className="globe-wrapper" aria-hidden="true">
      <div className="globe-container" ref={containerRef} />
    </div>
  );
}

export default Globe;
