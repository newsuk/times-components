import PropTypes from "prop-types";

export const cardPropTypes = {
  image: PropTypes.shape({ uri: PropTypes.string }),
  imageRatio: PropTypes.number,
  imageSize: PropTypes.number,
  showImage: PropTypes.bool,
  children: PropTypes.node,
  isLoading: PropTypes.bool
};

export const cardDefaultProps = {
  image: {
    uri: ""
  },
  imageRatio: 1,
  imageSize: 100,
  showImage: false,
  children: [],
  isLoading: false
};
