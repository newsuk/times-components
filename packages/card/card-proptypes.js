import PropTypes from "prop-types";

export const cardPropTypes = {
  children: PropTypes.node,
  image: PropTypes.shape({ uri: PropTypes.string }),
  imageRatio: PropTypes.number,
  imageSize: PropTypes.number,
  isLoading: PropTypes.bool,
  showImage: PropTypes.bool
};

export const cardDefaultProps = {
  children: [],
  image: {
    uri: ""
  },
  imageRatio: 1,
  imageSize: 100,
  isLoading: false,
  showImage: false
};
