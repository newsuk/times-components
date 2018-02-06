import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const { style: TextStylePropTypes } = Text.propTypes;

const ArticleSummaryHeadline = ({ headline, style }) => (
  <Text style={[styles.headline, styles.headlineWrapper, style]}>
    {headline}
  </Text>
);

ArticleSummaryHeadline.propTypes = {
  headline: PropTypes.string.isRequired,
  style: TextStylePropTypes
};

ArticleSummaryHeadline.defaultProps = {
  style: {}
};

export default ArticleSummaryHeadline;
