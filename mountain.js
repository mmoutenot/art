const canvasSketch = require('canvas-sketch');
const { renderPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');

import * as utils from './utils.js'

const settings = {
  dimensions: 'A4',
  orientation: 'landscape',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const MARGIN = 1.0;

const seed = 'kayla'

const sketch = ({ width, height }) => {
  const xCenter = width / 2;
  const yCenter = height / 2;

  let lines = [];
  let prevRightLine;
  for (let i = 0; i < seed.length; i++) {
    const charCode = seed.charCodeAt(i) 
    const seedCode = Math.sqrt(charCode - 92);
    const baseY = yCenter + .5

    let x0 = prevRightLine ? prevRightLine[1][0] - .5  : 1;
    let y0 = baseY;
    const x1 = x0 + seedCode / 2
    const y1 = baseY - seedCode / 2

    if (prevRightLine) {
      const prevX0 = prevRightLine[0][0]
      const prevY0 = prevRightLine[0][1]
      const prevX1 = prevRightLine[1][0]
      const prevY1 = prevRightLine[1][1]
      const intersection = utils.intersect(prevX0, prevY0, prevX1, prevY1, x0, y0, x1, y1)
      if (intersection) {
        x0 = intersection.x;
        y0 = intersection.y;
      }
    }

    const x2 = x0 + seedCode
    const y2 = baseY 

    const leftLine = [[x0, y0], [x1, y1]]
    const rightLine = [[x1, y1], [x2, y2]]
    lines.push(leftLine)
    lines.push(rightLine)

    const height = x2 - x1;

    let j = 1;
    for (let h = 0; h <= height; h += 0.1) {
      lines.push([[x1 + h, y1 + 0.12 * j], [x1 + h, y1 + 0.1 * j]])
      j += 1;
    }

    prevRightLine = rightLine
  }

  let i = 0;
  while (i < 3) {
    let x = 0;
    let y = 0;
    while (x < width) {
      const xD = utils.getRandomInt(4);
      const yD = utils.getRandomInt(2) / 4;
      lines.push([[x, y], [x + xD, y + yD]]);
      x += xD;
      y += yD; 
    }
    i += 1;
  }

  // lines.push([[0, height / 2], [width, height / 2]])

  // Clip all the lines to a margin
  const yStart = MARGIN;
  const yEnd = height - MARGIN;
  const xStart = MARGIN;
  const xEnd = width - MARGIN;
  const box = [ xStart, yStart, xEnd, yEnd ];
  lines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => renderPolylines(lines, props);
};

canvasSketch(sketch, settings);