import PropTypes from "prop-types";
import { AD_DEFAULT_BASE_URL } from "./utils/constants";

const { style: ViewPropTypesStyle } = PropTypes.object;

export const propTypes = {
  baseUrl: PropTypes.string,
  contextUrl: PropTypes.string,
  isLoading: PropTypes.bool,
  section: PropTypes.string,
  slotName: PropTypes.string.isRequired,
  style: ViewPropTypesStyle
};

export const defaultProps = {
  baseUrl: `${AD_DEFAULT_BASE_URL}/`,
  contextUrl: "",
  isLoading: false,
  section: "",
  style: null
};
