import PropTypes from "prop-types";
import { styleguide } from "@times-components/ts-components";
import {
  propTypes as twitterPropTypes,
  defaultProps as twitterDefaultTypes
} from "./pull-quote-twitter-link-prop-types";

const { colours } = styleguide();

export const propTypes = {
  caption: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  font: PropTypes.string,
  onTwitterLinkPress: twitterPropTypes.onTwitterLinkPress,
  quoteColour: PropTypes.string,
  text: PropTypes.string,
  twitter: twitterPropTypes.twitter
};

export const defaultProps = {
  caption: "",
  font: null,
  quoteColour: colours.functional.secondary,
  text: "",
  twitter: twitterDefaultTypes.twitter
};
