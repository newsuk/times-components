const config = ({ itemCount }) => ({
  showImage: itemCount < 3,
  summaryConfig: {
    lengths: [125]
  }
});

export default config;
