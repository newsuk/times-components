import PropTypes from "prop-types";
import cropPropTypes from "./crop-prop-types";

export const articleLeadAssetVideoPropTypes = {
  brightcoveAccountId: PropTypes.string.isRequired,
  brightcovePolicyKey: PropTypes.string.isRequired,
  brightcoveVideoId: PropTypes.string.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  posterImage: PropTypes.shape({
    crop32: cropPropTypes,
    crop169: cropPropTypes
  }).isRequired,
  skySports: PropTypes.bool
};

export const articleLeadAssetVideoDefaultProps = {
  skySports: false
};
