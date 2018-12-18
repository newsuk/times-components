import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import styleFactory from "./styles";

const styles = styleFactory();

const BodyParagraph = props => (
  <View style={[styles.articleMainContentRow]}>
    <Context.Consumer>
      {({ theme: { dropCapFont, scale } }) => {
        const stylesScaled = styleFactory(dropCapFont, scale);
        return (
          <Text selectable style={stylesScaled.articleTextElement}>
            {props.children}
          </Text>
        );
      }}
    </Context.Consumer>
  </View>
);

BodyParagraph.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default BodyParagraph;
