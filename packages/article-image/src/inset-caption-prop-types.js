import PropTypes from "prop-types";
import Caption, {
  propTypes as captionPropTypes,
  defaultProps as captionDefaultProps
} from "@times-components/caption";

export const propTypes = {
  ...captionPropTypes,
  CaptionComponent: PropTypes.func.isRequired
};

export const defaultProps = {
  ...captionDefaultProps,
  CaptionComponent: Caption
};
