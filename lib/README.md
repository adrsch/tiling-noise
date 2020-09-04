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
```
## Usage
Requires a 4d noise function `noise4D(x, y, z, w)` from a library such as those above
```
import makeTilingNoise from 'tiling-noise';

// Using open-simplex-noise:
import { makeNoise4D } from 'open-simplex-noise';
const noise4D = makeNoise4D(Date.now());

// Using simplex-noise:
import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise();
const noise4D = (x, y, z, w) => simplex.noise4D(x, y, z, w);

// Using asm-noise:
const noise4D = require('asm-noise');

const tilingNoise = makeTilingNoise({
  width: tileWidth, // required
  height: tileHeight, // required
  noise4D: noise4D, // required
  // Constant used to stretch circle in torus mapping, uniform or per axis
  stretch: 1, // or [xStrech, yStretch, zStretch, wStretch]
  // Offset constant in 4D space, uniform or per axis
  offset: 0, // or [xOffset, yOffset, zOffset, wOffset]
});

const noise = tilingNoise(x, y);
```
Full example (with open-simplex-noise):  
![](https://raw.githubusercontent.com/adrsch/tiling-noise/master/images/stretch10.png)
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
```

### Offset (& Animation)
Offset animated:  
![](https://raw.githubusercontent.com/adrsch/tiling-noise/master/images/basicanimated.gif)  
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
![](https://raw.githubusercontent.com/adrsch/tiling-noise/master/images/offsetcomponents.gif)  
### Stretch
`stretch: 1`  
![](https://raw.githubusercontent.com/adrsch/tiling-noise/master/images/stretch1.png)  
`stretch: 10`  
![](https://raw.githubusercontent.com/adrsch/tiling-noise/master/images/stretch10.png)  
`stretch: 100`  
![](https://raw.githubusercontent.com/adrsch/tiling-noise/master/images/stretch100.png)  
`stretch: [10, 1]` or `stretch: [10, 1, 10, 1]`  
![](https://raw.githubusercontent.com/adrsch/tiling-noise/master/images/verticalstretch.png)  
`stretch: [10, 1, 1, 10]`  
![](https://raw.githubusercontent.com/adrsch/tiling-noise/master/images/ellipses.png)  

Setting `stretch: [time, 1, 1, time]`   
![](https://raw.githubusercontent.com/adrsch/tiling-noise/master/images/stretchanimated.gif)  

