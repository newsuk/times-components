import PropTypes from "prop-types";

const articleLabelPropTypes = {
  isVideo: PropTypes.bool,
  label: PropTypes.string
};

const articleLabelDefaultProps = {
  isVideo: false,
  label: null
};

export { articleLabelPropTypes, articleLabelDefaultProps };
