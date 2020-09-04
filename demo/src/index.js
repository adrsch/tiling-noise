import { makeNoise4D } from 'open-simplex-noise';
import makeTiling from '../../lib/dist/tiling';

const basicDemoStatic = () => {
  const [width, height] = [400, 200];
  const [tileWidth, tileHeight] = [64, 64];

  const noise4D = makeNoise4D(Date.now());
  const tilingNoise = makeTiling({
    width: tileWidth, 
    height: tileHeight, 
    noise4D: noise4D,
    stretch: 10,
  });

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(width, height);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const i = 4 * (y * width + x);
      const value = (tilingNoise(x, y) + 1) * 128;
      img.data[i] = value;
      img.data[i + 1] = value;
      img.data[i + 2] = value;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
};

basicDemoStatic();

const basicDemoAnimated = () => {
  const [width, height] = [400, 200];
  const [tileWidth, tileHeight] = [64, 64];

  const noise4D = makeNoise4D(Date.now());

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let time = 0;
  setInterval(() => {
    const tilingNoise = makeTiling({
      width: tileWidth, 
      height: tileHeight, 
      noise4D: noise4D,
      stretch: 10,
      offset: time * 0.1,
    });
    const img = ctx.createImageData(width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const i = 4 * (y * width + x);
        const value = (tilingNoise(x, y) + 1) * 128;
        img.data[i] = value;
        img.data[i + 1] = value;
        img.data[i + 2] = value;
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    time++;
  }, 100);
};

basicDemoAnimated();
