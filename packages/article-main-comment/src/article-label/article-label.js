import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import ArticleLabel from "@times-components/article-label";
import Context from "@times-components/context";
import { colours } from "@times-components/styleguide";
import styles from "../styles";

const Label = ({ label }) => (
  <Context.Consumer>
    {({ theme: { sectionColour } }) => (
      <View style={styles.label}>
        <ArticleLabel
          color={sectionColour || colours.section.default}
          title={label}
        />
      </View>
    )}
  </Context.Consumer>
);

Label.propTypes = {
  label: PropTypes.string.isRequired
};

export default Label;
