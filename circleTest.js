const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = ({ context, width, height }) => {
    const n = random.noise1D(x, frequency = 1, amplitude = 1);
    console.log(n);
    context.beginPath();
    context.arc(width/2, height - height/3, height / 4, 0, Math.PI * 2, false);
    context.stroke()
  };

canvasSketch(sketch, settings);
