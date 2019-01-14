import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";

const articleLabelPropTypes = {
  color: PropTypes.string,
  isVideo: PropTypes.bool,
  label: PropTypes.string
};

const articleLabelDefaultProps = {
  color: colours.functional.white,
  isVideo: false,
  label: null
};

export { articleLabelPropTypes, articleLabelDefaultProps };
