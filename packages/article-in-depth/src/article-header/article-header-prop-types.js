import PropTypes from "prop-types";
import styleguide from "@times-components/styleguide";

const { colours } = styleguide();

const articleHeaderPropTypes = {
  backgroundColour: PropTypes.string,
  flags: PropTypes.arrayOf(PropTypes.string),
  hasVideo: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  label: PropTypes.string,
  standfirst: PropTypes.string,
  textColour: PropTypes.string
};

const articleHeaderDefaultProps = {
  backgroundColour: colours.functional.brandColour,
  flags: null,
  hasVideo: false,
  label: null,
  standfirst: null,
  textColour: colours.functional.white
};

export { articleHeaderPropTypes, articleHeaderDefaultProps };
