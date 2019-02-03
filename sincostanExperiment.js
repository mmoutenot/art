const canvasSketch = require('canvas-sketch');
const { renderPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
import utils from './utils';

const settings = {
  dimensions: 'A4',
  orientation: 'landscape',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const sketch = ({ width, height }) => {
  // List of polylines for our pen plot
  let lines = [];

  const steps = 25;
  const scale = 5;
  for (let i = 2; i < steps; i++) {
    const sin = width / 2 + Math.sin(i) * scale;
    const cos = height / 2 + Math.cos(i) * scale;
    const tan = width / 2 + Math.tan(i) * scale
    const cotan = height / 2 + Math.tanh(i) * scale;
    lines.push([[sin, cos], [tan, cotan]]);
  }
  console.log(lines)

  // Draw some circles expanding outward
  // Clip all the lines to a margin
  const margin = 1.0;
  const box = [ margin, margin, width - margin, height - margin ];
  lines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => renderPolylines(lines, props);
};

canvasSketch(sketch, settings);