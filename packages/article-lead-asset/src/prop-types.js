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
  getImageCrop: PropTypes.func.isRequired,
  leadAsset: PropTypes.shape(videoLeadAssetPropTypes),
  onVideoPress: PropTypes.func.isRequired
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

export const imagePropTypes = {
  caption: PropTypes.node,
  getImageCrop: PropTypes.func.isRequired,
  leadAsset: PropTypes.shape(leadAssetImagePropTypes),
  width: PropTypes.number
};

export const imageDefaultProps = {
  caption: null,
  leadAsset: {
    caption: null,
    credits: null,
    crop11: null,
    crop23: null,
    crop32: null,
    crop45: null,
    crop169: null,
    crop1251: null
  },
  width: null
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
  renderModalCaption: PropTypes.func,
  width: PropTypes.number
};

export const defaultProps = {
  aspectRatio: "1",
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
