const getDimensions = () => {
  let width = 1024;
  let height = 768;
  if (typeof window !== "undefined") {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  return { width, height };
};

export default getDimensions;
