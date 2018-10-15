import PropTypes from "prop-types";
import cropPropTypes from "./crop-prop-types";

export const articleLeadAssetVideoPropTypes = {
  brightcoveVideoId: PropTypes.string.isRequired,
  brightcovePolicyKey: PropTypes.string.isRequired,
  brightcoveAccountId: PropTypes.string.isRequired,
  posterImage: PropTypes.shape({
    crop169: cropPropTypes,
    crop32: cropPropTypes
  }).isRequired,
  onVideoPress: PropTypes.func.isRequired,
  skySports: PropTypes.bool
};

export const articleLeadAssetVideoDefaultProps = {
  skySports: false
};
