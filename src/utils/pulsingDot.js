/**
 * Factory for a Mapbox StyleImageInterface that renders an animated pulsing dot.
 * Uses canvas 2D to draw expanding white rings around a solid white dot.
 *
 * @param {mapboxgl.Map} map - Map instance (needed for triggerRepaint)
 * @param {Object} [options]
 * @param {number} [options.size=100] - Canvas size in pixels
 * @param {number} [options.duration=1500] - Pulse cycle in ms
 * @param {string} [options.color='rgba(255, 255, 255, 1)'] - Inner dot fill
 * @param {string} [options.pulseColor='255, 255, 255'] - Pulse ring RGB values
 * @returns {Object} StyleImageInterface-compliant object
 */
export function createPulsingDot(map, options = {}) {
  const {
    size = 100,
    duration = 1500,
    color = 'rgba(255, 255, 255, 1)',
    pulseColor = '255, 255, 255',
  } = options;

  return {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    onAdd() {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },

    render() {
      const t = (performance.now() % duration) / duration;
      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const ctx = this.context;

      ctx.clearRect(0, 0, this.width, this.height);

      // Outer pulsing ring — fades out as it expands
      ctx.beginPath();
      ctx.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${pulseColor}, ${1 - t})`;
      ctx.fill();

      // Inner solid dot
      ctx.beginPath();
      ctx.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.strokeStyle = `rgba(${pulseColor}, 0.3)`;
      ctx.lineWidth = 2 + 4 * (1 - t);
      ctx.fill();
      ctx.stroke();

      this.data = ctx.getImageData(0, 0, this.width, this.height).data;

      // Request next frame so the animation loops continuously
      map.triggerRepaint();
      return true;
    },
  };
}
