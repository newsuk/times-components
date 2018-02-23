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
  children: PropTypes.node,
  image: PropTypes.shape({ uri: PropTypes.string }),
  imageRatio: PropTypes.number,
  imageSize: PropTypes.number,
  isLoading: PropTypes.bool,
  showImage: PropTypes.bool
};

export const defaultProps = {
  children: [],
  image: {
    uri: ""
  },
  imageRatio: 1,
  imageSize: 100,
  isLoading: false,
  showImage: false
};
