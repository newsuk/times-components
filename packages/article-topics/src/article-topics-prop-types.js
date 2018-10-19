import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const topicsPropTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypesStyle,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.name.isRequired,
      slug: PropTypes.slug
    }).isRequired
  ).isRequired
};

export const topicsDefaultProps = {
  style: null
};

