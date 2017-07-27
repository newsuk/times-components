import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Diamond from "./diamond";

const styles = {
  flag: {
    fontFamily: "TimesDigital-RegularSC",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 1
  },
  new: {
    color: "#E34605"
  },
  sponsored: {
    color: "#4D4D4D"
  },
  updated: {
    color: "#3C81BE"
  }
};

const getStyles = StyleSheet.create(styles);

const ArticleFlag = ({ title, value, style }) => {
  if (!title || !value) {
    return null;
  }

  const flagStyles = styles[title.toLowerCase()];
  const color =
    (flagStyles && flagStyles.color) || (style && style.color) || "black";

  return (
    <Text style={[styles.flag, getStyles[title.toLowerCase()], style]}>
      <Diamond height={7} width={7} color={color} /> {title.toUpperCase()}
    </Text>
  );
};

ArticleFlag.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  style: PropTypes.shape({})
};

ArticleFlag.defaultProps = {
  style: {}
};

export default ArticleFlag;
