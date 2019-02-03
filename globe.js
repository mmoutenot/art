const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
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

const sketch = ({ context, width, height }) => {
  context.beginPath();
  context.arc(width/2, height/2, height / 4, 0, Math.PI * 2, false);
  context.stroke()
};

canvasSketch(sketch, settings);