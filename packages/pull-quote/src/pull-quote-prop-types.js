import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import {
  propTypes as twitterPropTypes,
  defaultProps as twitterDefaultTypes
} from "./pull-quote-twitter-link-prop-types";

export const propTypes = {
  caption: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string]))
      .isRequired,
    PropTypes.object
  ]),
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
