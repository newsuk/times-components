import React from "react";
import {
  checkStylesForUnits,
  gqlRgbaToHex,
  TcText
} from "@times-components/utils";
import PropTypes from "prop-types";
import styles from "./style";

const articleStyle = color => ({
  ...checkStylesForUnits(styles.title),
  color: gqlRgbaToHex(color) || color
});

const ArticleLabel = ({ color, title }) => (
  <TcText style={articleStyle(color)}>{title.toUpperCase()}</TcText>
);

ArticleLabel.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      rgba: PropTypes.shape({
        alpha: PropTypes.number,
        blue: PropTypes.number,
        green: PropTypes.number,
        red: PropTypes.number
      })
    })
  ]),
  title: PropTypes.string.isRequired
};

ArticleLabel.defaultProps = {
  color: "black"
};

export default ArticleLabel;
