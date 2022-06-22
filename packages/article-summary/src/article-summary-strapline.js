import React from "react";
import { TcText } from "@times-components/utils";
import PropTypes from "prop-types";
import styles from "./styles";

const ArticleSummaryStrapline = ({ strapline, style }) => (
  <TcText
    accessibilityRole="header"
    aria-level="4"
    style={{...styles.strapline, ...style}}
  >
    {strapline}
  </TcText>
);

ArticleSummaryStrapline.propTypes = {
  strapline: PropTypes.string.isRequired,
  style: PropTypes.object
};

ArticleSummaryStrapline.defaultProps = {
  style: {}
};

export default ArticleSummaryStrapline;
