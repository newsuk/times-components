const angleToPoints = angle => {
  const segment = Math.floor((angle / Math.PI) * 2) + 2;
  const diagonal = ((1 / 2) * segment + 1 / 4) * Math.PI;
  const op = Math.cos(Math.abs(diagonal - angle)) * Math.sqrt(2);
  const x = op * Math.cos(angle);
  const y = op * Math.sin(angle);

  return {
    end: {
      x: x >= 0 ? x : x + 1,
      y: y >= 0 ? y : y + 1
    },
    start: {
      x: x < 0 ? 1 : 0,
      y: y < 0 ? 1 : 0
    }
  };
};

export default angleToPoints;
