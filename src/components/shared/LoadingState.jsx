/**
 * Full-viewport loading indicator shown while Mapbox loads.
 * Displays a pulsing dot on a dark background matching the app theme.
 */
function LoadingState({ message = 'Loading map...' }) {
  return (
    <div className="loading-state">
      <div className="loading-state__spinner" />
      <p className="loading-state__text">{message}</p>
    </div>
  );
}

export default LoadingState;
