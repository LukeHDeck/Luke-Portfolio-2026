import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { useMapbox } from '../hooks/useMapbox';
import { useWebGLSupport } from '../hooks/useWebGLSupport';
import { waypoints, getAllWaypointsFlat } from '../data/waypoints';
import { flyToWaypoint, setupWaypointMarkers, filterMarkersForSection } from '../utils/mapHelpers';
import MapNav from './MapNav';
import ModeToggle from './ModeToggle';
import LoadingState from './shared/LoadingState';
import About from './sections/About';
import Skills from './sections/Skills';
import Certificates from './sections/Certificates';
import CaseStudyShowcase from './sections/CaseStudyShowcase';
import Featured from './sections/Featured';
import Contact from './sections/Contact';
import '../styles/map-experience.css';

/**
 * Component map — resolves waypoint IDs to section components.
 * Individual case studies are resolved dynamically via CaseStudyShowcase.
 * The 'case-studies' parent is handled directly in ContentPanel as a simple list.
 */
const SECTION_COMPONENTS = {
  about: About,
  skills: Skills,
  certificates: Certificates,
  featured: Featured,
  contact: Contact,
};

/**
 * Inline horizontal nav dots rendered inside the content panel on mobile.
 * Hidden on desktop via CSS (display: none on .content-panel__nav).
 */
function InlineMobileNav({ waypoints: wps, activeIndex, onNavigate }) {
  return (
    <nav className="content-panel__nav" aria-label="Section navigation">
      {wps.map((wp, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={wp.id}
            className={`content-panel__nav-dot ${isActive ? 'content-panel__nav-dot--active' : ''}`}
            onClick={() => onNavigate(i)}
            aria-label={`Navigate to ${wp.title}`}
          >
            <span className="content-panel__nav-dot-inner" />
            {isActive && <span className="content-panel__nav-label">{wp.title}</span>}
          </button>
        );
      })}
    </nav>
  );
}

/**
 * Content panel overlay that appears when the camera arrives at a waypoint.
 * Handles enter/exit animations via CSS class transitions.
 *
 * When activeChild is set, renders the individual case study showcase.
 * When the case-studies parent is active, renders a simple clickable list
 * that links out to each sub-point.
 */
function ContentPanel({ waypoint, activeChild, panelState, onSelectChild, navProps }) {
  const mobileNav = <InlineMobileNav {...navProps} />;

  // Determine the body content based on active state
  let body = null;
  if (panelState !== 'hidden') {
    if (activeChild) {
      body = <CaseStudyShowcase caseStudyId={activeChild.id} compact />;
    } else if (waypoint.id === 'case-studies' && waypoint.children) {
      body = (
        <>
          <h2 className="case-study-list__heading">Selected Work</h2>
          <div className="case-study-list">
            {waypoint.children.map((child, i) => (
              <button
                key={child.id}
                className="case-study-list__item"
                onClick={() => onSelectChild(i)}
              >
                <div className="case-study-list__text">
                  <span className="case-study-list__title">{child.title}</span>
                  <span className="case-study-list__desc">{child.description}</span>
                </div>
                <span className="case-study-list__arrow">&rarr;</span>
              </button>
            ))}
          </div>
        </>
      );
    } else {
      const SectionComponent = SECTION_COMPONENTS[waypoint.id];
      if (SectionComponent) {
        body = <SectionComponent compact />;
      }
    }
  }

  return (
    <div className={`content-panel content-panel--${panelState}`}>
      {mobileNav}
      <div className={`content-panel__body content-panel__body--${panelState}`}>
        {body}
      </div>
    </div>
  );
}

/**
 * Error fallback shown when Mapbox fails to load.
 */
function ErrorFallback({ error, onRetry, onRedirect }) {
  return (
    <div className="map-experience__error">
      <h2>Map failed to load</h2>
      <p>{error}</p>
      <div className="map-experience__error-actions">
        <button onClick={onRetry} className="map-experience__error-btn">
          Retry
        </button>
        <button onClick={onRedirect} className="map-experience__error-btn map-experience__error-btn--secondary">
          View as scroll portfolio
        </button>
      </div>
    </div>
  );
}

/**
 * Map Experience — the globe-based portfolio experience.
 *
 * Manages:
 * - Full-viewport Mapbox globe with interactive controls
 * - Waypoint navigation with flyTo transitions
 * - Content panel overlay with enter/exit animations
 * - Navigation dot indicator (MapNav) with expandable sub-dots
 * - Loading and error states
 */
function MapExperience() {
  const mapContainerRef = useRef(null);
  const moveEndListenerRef = useRef(null);
  const navigate = useNavigate();

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChildIndex, setActiveChildIndex] = useState(null);
  const [panelState, setPanelState] = useState('hidden');
  const [retryKey, setRetryKey] = useState(0);

  // Hooks
  const { webglSupported, isMobile } = useWebGLSupport();
  const { mapRef, mapLoaded, mapError } = useMapbox(mapContainerRef, {
    center: [0, 20],
    zoom: 2,
    pitch: 0,
    bearing: 0,
  });

  // Redirect unsupported browsers/devices to scroll mode
  useEffect(() => {
    if (webglSupported === false || isMobile) {
      navigate('/scroll', { replace: true });
    }
  }, [webglSupported, isMobile, navigate]);

  // Ref to hold current handlers so map listeners avoid stale closures
  const handleNavigateRef = useRef(null);
  const handleNavigateChildRef = useRef(null);

  // Initial flyTo + pulsing dot markers after map loads
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const map = mapRef.current;

    // Add pulsing dot markers at each waypoint (including children)
    setupWaypointMarkers(map);

    // Brief delay to let the map settle before flying
    const timer = setTimeout(() => {
      flyToWaypoint(map, waypoints[0], () => {
        setPanelState('entering');
        setTimeout(() => setPanelState('visible'), 500);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [mapLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // Hover tooltip + click navigation on pulsing dot markers
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const map = mapRef.current;
    const layerId = 'waypoint-pulsing-dots';

    // Wait for layer to be available
    if (!map.getLayer(layerId)) return;

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 15,
      className: 'waypoint-popup',
      maxWidth: '240px',
    });

    function handleMouseEnter(e) {
      map.getCanvas().style.cursor = 'pointer';

      const feature = e.features[0];
      if (!feature) return;

      const coordinates = feature.geometry.coordinates.slice();
      const { title, description } = feature.properties;

      popup
        .setLngLat(coordinates)
        .setHTML(`<strong>${title}</strong><p>${description}</p>`)
        .addTo(map);
    }

    function handleMouseLeave() {
      map.getCanvas().style.cursor = '';
      popup.remove();
    }

    function handleMarkerClick(e) {
      const feature = e.features[0];
      if (!feature) return;

      const clickedId = feature.properties.id;

      // Check if it's a top-level waypoint
      const topIndex = waypoints.findIndex((wp) => wp.id === clickedId);
      if (topIndex !== -1 && handleNavigateRef.current) {
        popup.remove();
        handleNavigateRef.current(topIndex);
        return;
      }

      // Check if it's a child waypoint
      for (let i = 0; i < waypoints.length; i++) {
        const wp = waypoints[i];
        if (!wp.children) continue;
        const childIndex = wp.children.findIndex((c) => c.id === clickedId);
        if (childIndex !== -1) {
          popup.remove();
          // First navigate to the parent, then to the child
          if (handleNavigateRef.current) {
            handleNavigateRef.current(i, childIndex);
          }
          return;
        }
      }
    }

    map.on('mouseenter', layerId, handleMouseEnter);
    map.on('mouseleave', layerId, handleMouseLeave);
    map.on('click', layerId, handleMarkerClick);

    return () => {
      map.off('mouseenter', layerId, handleMouseEnter);
      map.off('mouseleave', layerId, handleMouseLeave);
      map.off('click', layerId, handleMarkerClick);
      popup.remove();
    };
  }, [mapLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Helper to fly to a waypoint and show the panel on arrival.
   */
  const flyAndShowPanel = useCallback((map, targetWaypoint) => {
    // Clean up any pending moveend listener
    if (moveEndListenerRef.current) {
      map.off('moveend', moveEndListenerRef.current);
      moveEndListenerRef.current = null;
    }

    const onArrival = () => {
      map.off('moveend', onArrival);
      moveEndListenerRef.current = null;
      setPanelState('entering');
      // Let the explode animation finish before settling to visible
      setTimeout(() => setPanelState('visible'), 500);
    };

    moveEndListenerRef.current = onArrival;
    map.on('moveend', onArrival);

    flyToWaypoint(map, targetWaypoint);
  }, []);

  /**
   * Navigate to a top-level waypoint by index.
   * Optionally navigate directly to a child (used when clicking a child marker on the map).
   */
  const handleNavigate = useCallback(function handleNavigate(index, childIndex = null) {
    if (!mapRef.current || mapRef.current._removed) return;

    // If clicking the same parent with no child change, skip
    if (index === activeIndex && childIndex === null && activeChildIndex === null) return;

    const map = mapRef.current;

    // Clean up any pending moveend listener
    if (moveEndListenerRef.current) {
      map.off('moveend', moveEndListenerRef.current);
      moveEndListenerRef.current = null;
    }

    // Collapse panel
    setPanelState('collapsing');

    setTimeout(() => {
      // Swap content while hidden, start flying
      setPanelState('hidden');
      setActiveIndex(index);
      setActiveChildIndex(childIndex);

      const wp = waypoints[index];
      const target = childIndex !== null && wp.children ? wp.children[childIndex] : wp;

      filterMarkersForSection(map, wp.id);
      flyAndShowPanel(map, target);
    }, 400); // Match collapse animation duration
  }, [activeIndex, activeChildIndex, flyAndShowPanel]);

  /**
   * Navigate to a child waypoint within the active parent.
   */
  const handleNavigateChild = useCallback(function handleNavigateChild(childIndex) {
    if (!mapRef.current || mapRef.current._removed) return;
    if (childIndex === activeChildIndex) return;

    const map = mapRef.current;
    const parentWp = waypoints[activeIndex];
    if (!parentWp.children) return;

    // Clean up any pending moveend listener
    if (moveEndListenerRef.current) {
      map.off('moveend', moveEndListenerRef.current);
      moveEndListenerRef.current = null;
    }

    // Collapse panel
    setPanelState('collapsing');

    setTimeout(() => {
      // Swap content while hidden, start flying
      setPanelState('hidden');
      setActiveChildIndex(childIndex);

      flyAndShowPanel(map, parentWp.children[childIndex]);
    }, 400); // Match collapse animation duration
  }, [activeIndex, activeChildIndex, flyAndShowPanel]);

  // Keep refs in sync so map click listeners always call the latest version
  useEffect(() => {
    handleNavigateRef.current = handleNavigate;
  }, [handleNavigate]);

  useEffect(() => {
    handleNavigateChildRef.current = handleNavigateChild;
  }, [handleNavigateChild]);

  /**
   * Handle retry after a map error.
   */
  function handleRetry() {
    setRetryKey((k) => k + 1);
  }

  function handleRedirectToScroll() {
    navigate('/scroll', { replace: true });
  }

  // Resolve the active child waypoint object (if any)
  const activeWaypoint = waypoints[activeIndex];
  const activeChild =
    activeChildIndex !== null && activeWaypoint.children
      ? activeWaypoint.children[activeChildIndex]
      : null;

  return (
    <div className="map-experience" key={retryKey}>
      {/* Map container */}
      <div className="map-experience__map-wrapper">
        <div ref={mapContainerRef} className="map-experience__map" />
      </div>

      {/* Content overlay */}
      <div className="map-experience__overlay">
        <ContentPanel
          waypoint={activeWaypoint}
          activeChild={activeChild}
          panelState={panelState}
          onSelectChild={handleNavigateChild}
          navProps={{ waypoints, activeIndex, onNavigate: handleNavigate }}
        />
      </div>

      {/* Navigation dots */}
      <MapNav
        waypoints={waypoints}
        activeIndex={activeIndex}
        activeChildIndex={activeChildIndex}
        onNavigate={handleNavigate}
        onNavigateChild={handleNavigateChild}
      />

      {/* Mode toggle */}
      <ModeToggle targetMode="scroll" />

      {/* Loading state */}
      {!mapLoaded && !mapError && <LoadingState />}

      {/* Error state */}
      {mapError && (
        <ErrorFallback
          error={mapError}
          onRetry={handleRetry}
          onRedirect={handleRedirectToScroll}
        />
      )}
    </div>
  );
}

export default MapExperience;
