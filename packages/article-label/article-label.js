import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

const styles = {
  title: {
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 10,
    fontWeight: "400"
  }
};

const ArticleLabel = ({ title, color }) => {
  if (!title) {
    return null;
  }

  return <Text style={[styles.title, { color }]}>{title.toUpperCase()}</Text>;
};

ArticleLabel.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string
};

ArticleLabel.defaultProps = {
  color: "black"
};

export default ArticleLabel;
