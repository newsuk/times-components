import PropTypes from "prop-types";
import { sharedPropTypes, sharedDefaultProps } from "./card-shared-prop-types";

export const cardPropTypes = {
  ...sharedPropTypes,
  children: PropTypes.node,
  fadeImageIn: PropTypes.bool,
  highResSize: PropTypes.number,
  imageAccessibilityLabel: PropTypes.string,
  imageStyle: PropTypes.object,
  imageUri: PropTypes.string,
  isLoading: PropTypes.bool,
  lowResQuality: PropTypes.number,
  lowResSize: PropTypes.number
};

export const cardDefaultProps = {
  ...sharedDefaultProps,
  children: null,
  fadeImageIn: false,
  highResSize: null,
  imageRatio: 1,
  imageStyle: {},
  imageUri: null,
  isLoading: false,
  lowResQuality: null,
  lowResSize: null
};
