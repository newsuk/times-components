import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import {
  propTypes as twitterPropTypes,
  defaultProps as twitterDefaultTypes
} from "./pull-quote-twitter-link-prop-types";

export const propTypes = {
  caption: PropTypes.string,
  captionColour: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  onTwitterLinkPress: twitterPropTypes.onTwitterLinkPress,
  quoteColour: PropTypes.string,
  text: PropTypes.string,
  twitter: twitterPropTypes.twitter
};

export const defaultProps = {
  caption: "",
  captionColour: colours.functional.secondary,
  quoteColour: colours.functional.secondary,
  text: "",
  twitter: twitterDefaultTypes.twitter
};
