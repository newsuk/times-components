import React from "react";
import { TcText, checkStylesForUnits } from "@times-components/utils";
import PropTypes from "prop-types";
import styles from "./styles";

const ArticleSummaryHeadline = ({ className, headline, style }) => (
  <TcText
    role="heading"
    aria-level="3"
    className={className}
    style={checkStylesForUnits({
      ...styles.headline,
      ...styles.headlineWrapper,
      ...style
    })}
  >
    {headline}
  </TcText>
);

ArticleSummaryHeadline.propTypes = {
  className: PropTypes.string,
  headline: PropTypes.string.isRequired,
  style: {}
};

ArticleSummaryHeadline.defaultProps = {
  className: "",
  style: {}
};

export default ArticleSummaryHeadline;
