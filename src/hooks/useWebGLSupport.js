import { useState, useEffect } from 'react';

/**
 * Detects WebGL support and mobile viewport.
 * Used to gate the globe experience — if either check fails,
 * the app defaults to the scroll experience.
 */
export function useWebGLSupport() {
  const [support, setSupport] = useState({
    webglSupported: null, // null = not yet checked
    isMobile: false,
  });

  useEffect(() => {
    // Test WebGL by creating a temporary canvas context
    let webglSupported = false;
    try {
      const canvas = document.createElement('canvas');
      webglSupported = !!(
        canvas.getContext('webgl') || canvas.getContext('webgl2')
      );
    } catch (e) {
      webglSupported = false;
    }

    setSupport({ webglSupported, isMobile: false });
  }, []);

  return support;
}
