import PropTypes from "prop-types";
import cropPropTypes from "./crop-prop-types";

export const leadAssetPropTypes = {
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

export const leadAssetDefaults = {
  caption: null,
  credits: null,
  crop11: null,
  crop23: null,
  crop32: null,
  crop45: null,
  crop169: null,
  crop1251: null,
};
