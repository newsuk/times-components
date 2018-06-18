import { ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  slotSuffix: PropTypes.string,
  networkId: PropTypes.string,
  adUnit: PropTypes.string,
  slotName: PropTypes.string.isRequired,
  section: PropTypes.string,
  baseUrl: PropTypes.string,
  contextUrl: PropTypes.string,
  style: ViewPropTypesStyle,
  amazonAccountID: PropTypes.string
};

// NOTE, these values are temporary, adding real values (or removing defaults
// altogether) will be done in REPLAT-591 and REPLAT-592
export const defaultProps = {
  slotSuffix: "",
  networkId: "3048",
  adUnit: "d.thetimes.co.uk",
  section: "news",
  baseUrl: "https://www.thetimes.co.uk/",
  contextUrl: "",
  style: null,
  amazonAccountID: null
};
