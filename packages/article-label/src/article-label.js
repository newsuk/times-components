import React from "react";
import { Text } from "react-native";
import { gqlRgbaToHex } from "@times-components/utils";
import PropTypes from "prop-types";
import styles from "./style";

const ArticleLabel = ({ color, title }) => (
  <Text style={[styles.title, { color: gqlRgbaToHex(color) || color }]}>
    {title.toUpperCase()}
  </Text>
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
