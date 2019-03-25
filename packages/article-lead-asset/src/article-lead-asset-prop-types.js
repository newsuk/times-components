import PropTypes from "prop-types";

const cropPropTypes = PropTypes.shape({
  ratio: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
});

const videoLeadAssetPropTypes = {
  brightcoveAccountId: PropTypes.string.isRequired,
  brightcovePolicyKey: PropTypes.string.isRequired,
  brightcoveVideoId: PropTypes.string.isRequired,
  posterImage: PropTypes.shape({
    crop32: cropPropTypes,
    crop169: cropPropTypes
  }).isRequired,
  skySports: PropTypes.bool
};

export const videoPropTypes = {
  aspectRatio: PropTypes.number.isRequired,
  leadAsset: PropTypes.shape(videoLeadAssetPropTypes),
  onVideoPress: PropTypes.func.isRequired,
  uri: PropTypes.string.isRequired
};

export const videoDefaultProps = {
  leadAsset: {
    skySports: null
  }
};

export const leadAssetImagePropTypes = {
  caption: PropTypes.string,
  credits: PropTypes.string,
  crop: cropPropTypes,
  crop11: cropPropTypes,
  crop23: cropPropTypes,
  crop32: cropPropTypes,
  crop45: cropPropTypes,
  crop169: cropPropTypes,
  crop1251: cropPropTypes
};

export const propTypes = {
  aspectRatio: PropTypes.string,
  displayImage: cropPropTypes,
  isVideo: PropTypes.bool,
  leadAsset: PropTypes.oneOfType([
    PropTypes.shape(leadAssetImagePropTypes),
    PropTypes.shape(videoLeadAssetPropTypes)
  ]),
  renderCaption: PropTypes.func,
  style: PropTypes.any,
  width: PropTypes.number
};

export const defaultProps = {
  aspectRatio: "1:1",
  displayImage: null,
  isVideo: false,
  leadAsset: null,
  renderCaption: () => null,
  width: null
};

export const nativePropTypes = {
  ...propTypes,
  getImageCrop: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func
};

export const nativeDefaultProps = {
  ...defaultProps,
  onVideoPress: null
};
