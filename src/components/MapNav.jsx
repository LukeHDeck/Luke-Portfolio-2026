import '../styles/nav.css';

/**
 * Navigation escape hatch for the map experience.
 * Vertical dot-based progress indicator visible at all times.
 * Each dot represents a waypoint/section — clicking triggers a flyTo.
 * Labels appear on hover next to each dot.
 *
 * Waypoints with children (e.g. Case Studies) show expandable sub-dots
 * that animate in when the parent is active.
 */
function MapNav({ waypoints, activeIndex, activeChildIndex, onNavigate, onNavigateChild }) {
  return (
    <nav className="map-nav" aria-label="Section navigation">
      <div className="map-nav__track">
        {waypoints.map((wp, i) => {
          const isActive = i === activeIndex;
          const hasChildren = wp.children && wp.children.length > 0;

          return (
            <div key={wp.id} className="map-nav__group">
              <button
                className={`map-nav__dot ${isActive ? 'map-nav__dot--active' : ''}`}
                onClick={() => onNavigate(i)}
                aria-label={`Navigate to ${wp.title}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="map-nav__dot-inner" />
                <span className="map-nav__tooltip">{wp.title}</span>
              </button>

              {/* Expandable children */}
              {hasChildren && isActive && (
                <div className="map-nav__children">
                  {wp.children.map((child, ci) => (
                    <button
                      key={child.id}
                      className={`map-nav__dot map-nav__dot--child ${ci === activeChildIndex ? 'map-nav__dot--active' : ''}`}
                      onClick={() => onNavigateChild(ci)}
                      aria-label={`Navigate to ${child.title}`}
                      aria-current={ci === activeChildIndex ? 'step' : undefined}
                    >
                      <span className="map-nav__dot-inner" />
                      <span className="map-nav__tooltip">{child.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default MapNav;
