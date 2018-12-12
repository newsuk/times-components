import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import ArticleLabel from "@times-components/article-label";
import { colours } from "@times-components/styleguide";
import styles from "../styles";

const Label = ({ label, color }) =>
  label ? (
    <View style={styles.label}>
      <ArticleLabel color={color || colours.section.default} title={label} />
    </View>
  ) : null;

Label.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string
};

Label.defaultProps = {
  color: colours.functional.white,
  label: null
};

export default Label;
