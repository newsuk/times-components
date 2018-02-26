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
    isShown: PropTypes.bool,
    ratio: PropTypes.number,
    size: PropTypes.number,
    uri: PropTypes.string
  }),
  isLoading: PropTypes.bool
};

export const defaultProps = {
  children: [],
  childRatio: 1,
  image: {
    isShown: false,
    ratio: 1,
    size: 100,
    uri: ""
  },
  isLoading: false
};
