const canvasSketch = require('canvas-sketch');
const {renderPolylines} = require('canvas-sketch-util/penplot');
const {clipPolylinesToBox} = require('canvas-sketch-util/geometry');
const random = require('canvas-sketch-util/random');

import * as utils from './utils.js';

const settings = {
  dimensions: 'A4',
  orientation: 'landscape',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const MARGIN = 1.0;

const nameSeed = 'marshall';
const ageSeed = 27;

function addBranches(lines, branchLength) {
  if (branchLength < 0.2) {
    return lines;
  }

  console.log(lines, branchLength);

  const lastBranchEnd = lines[lines.length - 1][1];
  const lastBranchX = lastBranchEnd[0];
  const lastBranchY = lastBranchEnd[1];

  const nextPoint = utils.rotate(
    lastBranchX,
    lastBranchY,
    lastBranchX,
    lastBranchY - branchLength,
    random.range(10, 60)
  );

  lines.push([[lastBranchX, lastBranchY], nextPoint]);

  return addBranches(lines, branchLength - 0.5 - random.value() / 8);
}

const sketch = ({width, height}) => {
  // Clip all the lines to a margin
  const yStart = MARGIN;
  const yCenter = height / 2;
  const yEnd = height - MARGIN;

  const xStart = MARGIN;
  const xCenter = width / 2;
  const xEnd = width - MARGIN;

  const box = [xStart, yStart, xEnd, yEnd];

  let lines = [];

  let trunkHeight = 4 + random.value() * 2;

  // trunk
  lines.push([[xCenter, yEnd], [xCenter, yEnd - trunkHeight]]);
  lines = addBranches(lines, trunkHeight - 2);

  lines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => renderPolylines(lines, props);
};

canvasSketch(sketch, settings);
