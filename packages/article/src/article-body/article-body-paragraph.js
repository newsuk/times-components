import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import styleFactory from "../styles/article-body";

const styles = styleFactory();

const BodyParagraph = props => (
  <View
    key={`paragraph-${props.uid}`}
    style={[styles.articleMainContentRow]}
    testID={`paragraph-${props.uid}`}
  >
    <Context.Consumer>
      {({ theme: { scale } }) => {
        const stylesScaled = styleFactory(scale);
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
  ).isRequired,
  uid: PropTypes.number.isRequired
};

export default BodyParagraph;
