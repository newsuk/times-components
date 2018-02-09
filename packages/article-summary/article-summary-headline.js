import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles/article-summary-headline-styles";

const ArticleSummaryHeadline = ({ headline }) => (
  <Text style={[styles.default, styles.headline]}>{headline}</Text>
);

ArticleSummaryHeadline.propTypes = {
  headline: PropTypes.string.isRequired
};

export default ArticleSummaryHeadline;
