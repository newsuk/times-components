import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import { ResponsiveContext } from "@times-components/responsive";
import styleFactory from "./styles";

const styles = styleFactory();

const BodyParagraph = props => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => (
      <View
        style={[
          styles.articleMainContentRow,
          isTablet && styles.articleMainContentRowTablet
        ]}
      >
        <Context.Consumer>
          {({ theme: { dropCapFont, scale } }) => {
            const stylesScaled = styleFactory(dropCapFont, scale);

            if (typeof props.children === "function") {
              return props.children(stylesScaled.articleTextElement);
            }

            return <Text selectable>{props.children}</Text>;
          }}
        </Context.Consumer>
      </View>
    )}
  </ResponsiveContext.Consumer>
);

BodyParagraph.propTypes = {
  children: PropTypes.func.isRequired
};

export default BodyParagraph;
