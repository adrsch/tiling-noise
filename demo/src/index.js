import { makeNoise4D } from 'open-simplex-noise';
import makeTiling from '../../lib/dist/tiling';

const [width, height] = [400, 280];
const [tileWidth, tileHeight] = [128, 128];
const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');
const img = ctx.createImageData(width, height);
const noise4D = makeNoise4D(Date.now());

let tilingNoise = makeTiling({
  width: tileWidth, 
  height: tileHeight, 
  noise4D: noise4D,
  scale: 10,
});
let z = 0;
setInterval(() => {console.time('someFunction');
  tilingNoise = makeTiling({
  width: tileWidth, 
  height: tileHeight, 
  noise4D: noise4D,
 // scale: 10,
    offset: [0, 0, 0, 0], scale:[z, 1, 1, z]
});

for (let x = 0; x < width; x++) {
  for (let y = 0; y < width; y++) {
    const i = 4 * (y * width + x);
   // const value = (tilingNoise(x, y, {z, offset: [0, 0, 0, 0], scale:[z, 1, 1, z]} ) + 1) * 128;
    const value = (tilingNoise(x, y) + 1) * 128;
    img.data[i] = value;
    img.data[i + 1] = value;
    img.data[i + 2] = value;
    img.data[i + 3] = 255;
  }
}
ctx.putImageData(img, 0, 0);
z+=0.5;console.timeEnd('someFunction');
}, 50);
document.body.appendChild(canvas);
