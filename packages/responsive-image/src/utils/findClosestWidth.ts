export default (width: number) => {
  const mostUsedWidths = [160, 280, 330, 485, 600, 685, 750, 1024, 1138, 1240, 1440, 1600];
  const result = width
    ? mostUsedWidths.reduce((prev, curr) => Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev)
    : 160;
  return result;
};