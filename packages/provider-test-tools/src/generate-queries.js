export default (genConfig, iterations = 1) =>
  new Array(iterations).fill(0).map((_, indx) => genConfig(indx + 1));
