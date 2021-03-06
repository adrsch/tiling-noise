const makeTiling = ({
  width,
  height,
  noise4D,
  stretch = [1, 1, 1, 1],
  offset = [0, 0, 0, 0],
}) => {
  const _offset = (Array.isArray(offset)) ?
    [0, 1, 2, 3].map(i => offset[i % offset.length]) :
    [offset, offset, offset, offset];
  const _stretch = (Array.isArray(stretch)) ?
    [0, 1, 2, 3].map(i => stretch[i % stretch.length]) :
    [stretch, stretch, stretch, stretch];
  const multiplier = _stretch.map(constant => constant / (2 * Math.PI));
  const s_xRatio = 2 * Math.PI / width;
  const t_yRatio = 2 * Math.PI / height;
  return (x, y) => {
    const s = s_xRatio * x;
    const t = t_yRatio * y;
    const nx = _offset[0] + multiplier[0] * Math.cos(s);
    const ny = _offset[1] + multiplier[1] * Math.cos(t);
    const nz = _offset[2] + multiplier[2] * Math.sin(s);
    const nw = _offset[3] + multiplier[3] * Math.sin(t);
    return noise4D(nx, ny, nz, nw);
  };
};

export default makeTiling;
