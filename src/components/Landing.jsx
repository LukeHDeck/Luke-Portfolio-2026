import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWebGLSupport } from '../hooks/useWebGLSupport';
import Globe from './Globe';
import '../styles/landing.css';

/**
 * Landing page — the first thing users see.
 * Full viewport with a decorative rotating globe background
 * and two mode selection options positioned in the lower third.
 */
function Landing() {
  const { webglSupported, isMobile } = useWebGLSupport();
  const [hoverState, setHoverState] = useState('none');
  const [visible, setVisible] = useState(false);

  const showGlobeOption = webglSupported && !isMobile;

  // Trigger fade-in after mount
  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className={`landing ${visible ? 'landing--visible' : ''}`}>
      {/* Decorative globe background */}
      {showGlobeOption && <Globe hoverState={hoverState} />}

      {/* Content overlay */}
      <div className="landing__content">
        <div className="landing__header">
          <h1 className="landing__name">Luke Decker</h1>
          <p className="landing__title">Map Designer & Cartographic Strategist</p>
        </div>

        <div className="landing__modes">
          {showGlobeOption && (
            <Link
              to="/map"
              className="landing__mode-card"
              onMouseEnter={() => setHoverState('globe')}
              onMouseLeave={() => setHoverState('none')}
            >
              <span className="landing__mode-label">Explore the Globe</span>
              <span className="landing__mode-hint">Interactive 3D experience</span>
            </Link>
          )}

          <Link
            to="/scroll"
            className="landing__mode-card"
            onMouseEnter={() => setHoverState('scroll')}
            onMouseLeave={() => setHoverState('none')}
          >
            <span className="landing__mode-label">Read the Portfolio</span>
            <span className="landing__mode-hint">Traditional scroll layout</span>
          </Link>
        </div>

        {/* Fallback notices */}
        {webglSupported === false && (
          <p className="landing__notice">
            Interactive map requires WebGL. Viewing in scroll mode.
          </p>
        )}
        {isMobile && webglSupported && (
          <p className="landing__notice">
            Globe experience is optimized for desktop.
          </p>
        )}
      </div>
    </div>
  );
}

export default Landing;
