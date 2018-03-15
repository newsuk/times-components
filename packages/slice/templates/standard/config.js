export const summaryConfig = {
  1: [125],
  2: [125],
  3: [125]
};

const config = itemCount => ({
  showImage: itemCount < 3,
  summaryConfig: summaryConfig[itemCount]
});

export default config;
