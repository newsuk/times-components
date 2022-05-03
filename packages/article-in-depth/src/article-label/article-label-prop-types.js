import PropTypes from "prop-types";
import { styleguide } from "@times-components/ts-components";

const { colours } = styleguide();

const articleLabelPropTypes = {
  color: PropTypes.string,
  isVideo: PropTypes.bool,
  label: PropTypes.string
};

const articleLabelDefaultProps = {
  color: colours.section.default,
  isVideo: false,
  label: null
};

export { articleLabelPropTypes, articleLabelDefaultProps };
