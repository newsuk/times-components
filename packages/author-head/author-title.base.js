import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  title: {
    fontFamily: "TimesDigitalW04-RegularSC",
    fontSize: 14,
    color: "#696969"
  }
});

const Title = ({ title, className }) => (
  <Text
    className={className}
    accessibilityRole="heading"
    aria-level="2"
    style={styles.title}
  >
    {title.toLowerCase()}
  </Text>
);

Title.defaultProps = {
  title: "",
  className: ""
};

Title.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string
};

export default Title;
