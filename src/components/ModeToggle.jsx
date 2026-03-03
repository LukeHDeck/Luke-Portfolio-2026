import { Link } from 'react-router-dom';

/**
 * Persistent mode toggle button — visible in both map and scroll experiences.
 * Allows switching between the two portfolio modes at any time.
 *
 * @param {'map' | 'scroll'} targetMode - Which mode to switch to
 */
function ModeToggle({ targetMode }) {
  const isToMap = targetMode === 'map';
  const label = isToMap ? 'Switch to Globe' : 'Switch to Scroll';
  const path = isToMap ? '/map' : '/scroll';

  return (
    <Link to={path} className="mode-toggle" aria-label={label} title={label}>
      {isToMap ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )}
      <span className="mode-toggle__label">{label}</span>
    </Link>
  );
}

export default ModeToggle;
