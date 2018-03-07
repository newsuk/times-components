import PropTypes from "prop-types";
import {
  loadingPropTypes,
  loadingDefaultProps
} from "./card-loading-proptypes";

export const cardPropTypes = {
  ...loadingPropTypes,
  children: PropTypes.node.isRequired,
  image: PropTypes.shape({ uri: PropTypes.string }),
  imageSize: PropTypes.number,
  isLoading: PropTypes.bool
};

export const cardDefaultProps = {
  ...loadingDefaultProps,
  image: {
    uri: ""
  },
  imageRatio: 1,
  imageSize: 100,
  isLoading: false
};
