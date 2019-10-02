import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { ResponsiveContext } from "@times-components/responsive";
import styleFactory from "./styles";

const styles = styleFactory();

const BodyParagraph = props => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => (
      <View
        style={[
          styles.articleMainContentRow,
          styles.articleTextElement,
          isTablet && styles.articleMainContentRowTablet,
          { height: props.height }
        ]}
      >
        <View>{props.children}</View>
      </View>
    )}
  </ResponsiveContext.Consumer>
);

BodyParagraph.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired
};

export default BodyParagraph;
