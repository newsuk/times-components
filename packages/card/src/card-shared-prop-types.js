import PropTypes from "prop-types";

export const sharedPropTypes = {
  contentContainerClass: PropTypes.string,
  imageContainerClass: PropTypes.string,
  imageRatio: PropTypes.number,
  isReversed: PropTypes.bool,
  showImage: PropTypes.bool
};

export const sharedDefaultProps = {
  contentContainerClass: "",
  imageContainerClass: "",
  imageRatio: 3 / 2,
  isReversed: false,
  showImage: false
};
