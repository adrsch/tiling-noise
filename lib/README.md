# Tiling Noise
A tiny library to make seamless tileable noise from any 4D noise function.  
Works by mapping coordinates to a [Clifford torus](https://en.wikipedia.org/wiki/Clifford_torus), using the [method described by JTippetts](https://www.gamedev.net/blog/33/entry-2138456-seamless-noise/).

## Installation
Use with your favorite 4D noise library
```
npm i tiling-noise

```
Or use with one of these
```
npm i tiling-noise open-simplex-noise
npm i tiling-noise simplex-noise
npm i tiling-noise asm-noise
npm i tiling-noise tumult
```
## Usage
Requires a 4d noise function `noise4D(x, y, z, w)` from a library such as those above
```
import makeTilingNoise from 'tiling-noise';

const tilingNoise = makeTilingNoise({
  width: tileWidth, // Required
  height: tileHeight, // Required
  noise4D: noise4D, // Required
  stretch: 1, // Stretches circle used mapping to torus - can be done per axis:
// stretch: [xStrech, yStretch, zStretch, wStretch],
  offset: 0, // Offset in 4d space of mapping - can be done per axis:
// offset: [0, 0, 0, 0],
});

const noise = tilingNoise(x, y);
```
Full example (with open-simplex-noise):
stretch10.png
```
import makeTiling from 'tiling-noise';
import { makeNoise4D } from 'open-simplex-noise';

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
Using open-simplex-noise:
```
import { makeNoise4D } from 'open-simplex-noise';
const noise4D = makeNoise4D(Date.now());
```
Using simplex-noise:
```
import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise();
const noise4D = (x, y, z, w) => simplex.noise4D(x, y, z, w);
```
Using asm-noise:
```
const noise4D = require('asm-noise');
```
Stretch examples:  
1  
stretch1.png
10  
stretch10.png  
100  
stretch100.png
[10, 1] or [10, 1, 10, 1]  
verticalstretch.png
[10, 1, 1, 10]
ellipses.png

Offset animated:
```
let time = 0;
setInterval(() => {
  const tilingNoise = makeTiling({
    width: tileWidth, 
    height: tileHeight, 
    noise4D: noise4D,
    stretch: 10,
    offset: 0.1 * time,
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
```
Effect of switching between incrementing each component of offset in equal time intervals:  
offsetcomponents.gif
Setting stretch to [time, 1, 1, time]:  
stretchanimated.gif

