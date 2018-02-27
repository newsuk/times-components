import PropTypes from "prop-types";

export const loadingPropTypes = {
  aspectRatio: PropTypes.number,
  childRatio: PropTypes.number,
  showImage: PropTypes.bool
};

export const loadingDefaultProps = {
  aspectRatio: 3 / 2,
  childRatio: 1,
  showImage: false
};

export const propTypes = {
  children: PropTypes.node,
  childRatio: PropTypes.number,
  image: PropTypes.shape({
    uri: PropTypes.string
  }),
  imageRatio: PropTypes.number,
  imageSize: PropTypes.number,
  showImage: PropTypes.bool,
  isLoading: PropTypes.bool
};

export const defaultProps = {
  children: [],
  childRatio: 1,
  image: {},
  imageRatio: 1,
  imageSize: 100,
  showImage: false,
  isLoading: false
};
