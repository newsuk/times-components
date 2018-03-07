import PropTypes from "prop-types";

export const loadingPropTypes = {
  contentContainerClass: PropTypes.string,
  imageContainerClass: PropTypes.string,
  imageRatio: PropTypes.number,
  showImage: PropTypes.bool
};

export const loadingDefaultProps = {
  contentContainerClass: "",
  imageContainerClass: "",
  imageRatio: 3 / 2,
  showImage: false
};
