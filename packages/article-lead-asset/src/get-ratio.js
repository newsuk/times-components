const getRatio = ratioString => {
  const [ratioWidth, ratioHeight] = ratioString.split(":");

  return Number(ratioWidth) / Number(ratioHeight);
};

export default getRatio;
