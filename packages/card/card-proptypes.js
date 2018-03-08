import PropTypes from "prop-types";
import { sharedPropTypes, sharedDefaultProps } from "./card-shared-proptypes";

export const cardPropTypes = {
  ...sharedPropTypes,
  children: PropTypes.node,
  image: PropTypes.shape({ uri: PropTypes.string }),
  imageSize: PropTypes.number,
  isLoading: PropTypes.bool
};

export const cardDefaultProps = {
  ...sharedDefaultProps,
  children: null,
  image: {
    uri: ""
  },
  imageRatio: 1,
  imageSize: 100,
  isLoading: false
};
