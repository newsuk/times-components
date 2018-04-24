import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";

export const propTypes = {
  caption: PropTypes.string,
  captionColour: PropTypes.string,
  content: PropTypes.string.isRequired,
  quoteColour: PropTypes.string,
  twitter: PropTypes.string
};

export const defaultProps = {
  caption: "",
  captionColour: colours.functional.secondary,
  quoteColour: colours.functional.secondary,
  twitter: ""
};
