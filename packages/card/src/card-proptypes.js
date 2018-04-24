import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";
import { sharedPropTypes, sharedDefaultProps } from "./card-shared-proptypes";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const cardPropTypes = {
  ...sharedPropTypes,
  children: PropTypes.node,
  image: PropTypes.shape({ uri: PropTypes.string }),
  imageSize: PropTypes.number,
  imageStyle: ViewPropTypesStyle,
  isLoading: PropTypes.bool
};

export const cardDefaultProps = {
  ...sharedDefaultProps,
  children: null,
  image: {
    uri: ""
  },
  imageRatio: 1,
  imageStyle: {},
  imageSize: null,
  isLoading: false
};
