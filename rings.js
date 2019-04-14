import canvasSketch from 'canvas-sketch';
import * as penplotUtils from 'canvas-sketch-util/penplot';
import * as geometryUtils from 'canvas-sketch-util/geometry';
import random from 'canvas-sketch-util/random';

const settings = {
  dimensions: 'A4',
  orientation: 'landscape',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const SPACING = 0.1;

const sketch = ({width, height}) => {
  // List of polylines for our pen plot
  let lines = [];

  // Draw some circles expanding outward
  const steps = 50;
  const count = 35;
  let radius = Math.min(width, height) * 0.02;

  for (let j = 0; j < count; j++) {
    const circle = [];
    for (let i = 0; i < steps; i++) {
      const angleNoise = (random.value() * SPACING * j) / (count - 10);
      const t = i / Math.max(1, steps - 1);
      const angle = Math.PI * 2 * t;
      circle.push([
        width / 2 + Math.cos(angle) * radius + angleNoise,
        height / 2 + Math.sin(angle) * radius + angleNoise,
      ]);
    }
    circle.push(circle[0]);
    lines.push(circle);

    if (j < count - 10) {
      const onCircle = random.onCircle(radius);
      const knotAngle = (Math.atan2(onCircle[0], onCircle[1]) * 180) / Math.PI;
      const knotStart = [
        width / 2 + Math.cos(knotAngle) * radius,
        height / 2 + Math.sin(knotAngle) * radius,
      ];
      radius += SPACING + SPACING * 0.2 * j;
      const knotEnd = [
        width / 2 + Math.cos(knotAngle) * radius,
        height / 2 + Math.sin(knotAngle) * radius,
      ];

      if (random.chance(0.2)) {
      lines.push([knotStart, knotEnd]);
      }
    }
  }

  // Clip all the lines to a margin
  const margin = 1.0;
  const box = [margin, margin, width - margin, height - margin];
  lines = geometryUtils.clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => penplotUtils.renderPolylines(lines, props);
};

canvasSketch(sketch, settings);
