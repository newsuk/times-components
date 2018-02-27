import PropTypes from "prop-types";

export const loadingPropTypes = {
  aspectRatio: PropTypes.number,
  showImage: PropTypes.bool
};

export const loadingDefaultProps = {
  aspectRatio: 3 / 2,
  showImage: false
};

export const propTypes = {
  image: PropTypes.shape({ uri: PropTypes.string }),
  imageRatio: PropTypes.number,
  imageSize: PropTypes.number,
  showImage: PropTypes.bool,
  children: PropTypes.node,
  isLoading: PropTypes.bool
};

export const defaultProps = {
  image: {
    uri: ""
  },
  imageRatio: 1,
  imageSize: 100,
  showImage: false,
  children: [],
  isLoading: false
};
