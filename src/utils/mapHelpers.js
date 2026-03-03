/**
 * Map helper utilities for flyTo transitions, globe spin animation,
 * and waypoint marker setup.
 */

import { createPulsingDot } from './pulsingDot';
import { getAllWaypointsFlat } from '../data/waypoints';

/**
 * Fly the map camera to a waypoint with smooth easing.
 * Uses essential: true so animations aren't interrupted by user interaction
 * during automated transitions.
 *
 * @param {mapboxgl.Map} map - The Mapbox map instance
 * @param {Object} waypoint - Waypoint with center, zoom, pitch, bearing
 * @param {Function} [onComplete] - Callback fired when the flyTo completes
 */
export function flyToWaypoint(map, waypoint, onComplete) {
  if (!map || map._removed) return;

  if (onComplete) {
    const handler = () => {
      map.off('moveend', handler);
      onComplete();
    };
    map.on('moveend', handler);
  }

  // On mobile, offset the center upward so POIs aren't hidden behind the panel
  const isMobile = window.innerWidth <= 768;
  const padding = isMobile
    ? { top: 0, bottom: Math.round(window.innerHeight * 0.5), left: 0, right: 0 }
    : { top: 0, bottom: 0, left: 0, right: 0 };

  map.flyTo({
    center: waypoint.center,
    zoom: waypoint.zoom,
    pitch: waypoint.pitch || 0,
    bearing: waypoint.bearing || 0,
    padding,
    duration: 2500,
    essential: true,
  });
}

/**
 * Start a continuous slow-spin animation on the globe.
 * The globe rotates by shifting longitude using easeTo in a loop.
 * Returns a cleanup function to stop the animation.
 *
 * @param {mapboxgl.Map} map - The Mapbox map instance
 * @param {number} [secondsPerRevolution=120] - How long a full 360 rotation takes
 * @returns {Function} Stop function to call on cleanup
 */
export function startSpinAnimation(map, secondsPerRevolution = 120) {
  let spinning = true;

  function spinGlobe() {
    if (!spinning || !map || map._removed) return;

    const center = map.getCenter();
    center.lng -= 360 / secondsPerRevolution;

    map.easeTo({
      center,
      duration: 1000,
      easing: (t) => t, // Linear easing for smooth continuous rotation
    });
  }

  map.on('moveend', spinGlobe);
  spinGlobe();

  return () => {
    spinning = false;
    map.off('moveend', spinGlobe);
  };
}

/**
 * Adjust the spin speed of a spinning globe.
 * Works by stopping and restarting with a new speed.
 *
 * @param {mapboxgl.Map} map - The Mapbox map instance
 * @param {Function} currentStop - Current stop function from startSpinAnimation
 * @param {number} secondsPerRevolution - New speed
 * @returns {Function} New stop function
 */
export function adjustSpinSpeed(map, currentStop, secondsPerRevolution) {
  if (currentStop) currentStop();
  return startSpinAnimation(map, secondsPerRevolution);
}

/**
 * Add animated pulsing dot markers at each waypoint location on the map.
 * Registers a custom canvas-animated image, a GeoJSON source, and a symbol layer.
 *
 * @param {mapboxgl.Map} map - The loaded Mapbox map instance
 */
export function setupWaypointMarkers(map) {
  if (!map || map._removed) return;

  const pulsingDot = createPulsingDot(map, {
    size: 100,
    duration: 1500,
    color: 'rgba(255, 255, 255, 1)',
    pulseColor: '255, 255, 255',
  });

  map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

  const allWaypoints = getAllWaypointsFlat();

  const geojson = {
    type: 'FeatureCollection',
    features: allWaypoints.map((wp) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: wp.center,
      },
      properties: {
        id: wp.id,
        title: wp.title,
        description: wp.description,
      },
    })),
  };

  map.addSource('waypoint-markers', {
    type: 'geojson',
    data: geojson,
  });

  map.addLayer({
    id: 'waypoint-pulsing-dots',
    type: 'symbol',
    source: 'waypoint-markers',
    layout: {
      'icon-image': 'pulsing-dot',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'icon-size': 0.75,
    },
  });
}
