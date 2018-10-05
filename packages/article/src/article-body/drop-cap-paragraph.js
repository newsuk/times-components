import React, { Component } from "react";
import { Dimensions, NativeModules, Text, View } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import styleFactory from "../styles/article-body";

class DropCapParagraph extends Component {
  constructor(props) {
    super(props);

    const { ReactTextHelper } = NativeModules;
    const screenWidth = Dimensions.get("window").width;
    this.state = {
      slicePoint: 0,
      screenWidth
    };
    const margins = 30;

    ReactTextHelper.measureSlicePoint(
      props.children.toString(),
      65,
      17,
      screenWidth - margins
    ).then(({ slicePoint, textViewWidth }) => {
      this.setState({ slicePoint, textViewWidth });
    });
  }

  renderParagraph(children) {
    const text = children.toString();
    const { screenWidth, slicePoint, textViewWidth } = this.state;

    return (
      <Context.Consumer>
        {({ theme: { scale } }) => {
          const stylesScaled = styleFactory(scale);
          return (
            <View
              style={{
                backgroundColor: "blue",
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            >
              <Text
                onLayout={({ nativeEvent: { layout: { width } } }) => {
                  console.log("DropCap Width:", width);
                }}
                selectable
                style={[
                  stylesScaled.articleTextElement,
                  {
                    backgroundColor: "red",
                    fontSize: 65,
                    lineHeight: 70,
                    height: 70,
                    marginBottom: 0
                  }
                ]}
              >
                {text.charAt(0)}
              </Text>
              <Text
                onLayout={({ nativeEvent: { layout: { width } } }) => {
                  console.log("Width:", width, "NativeWidth:", textViewWidth);
                }}
                selectable
                style={[
                  stylesScaled.articleTextElement,
                  {
                    flex: 1,
                    backgroundColor: "green",
                    marginBottom: 0
                  }
                ]}
              >
                {text.slice(1, slicePoint)}
              </Text>

              <Text
                selectable
                style={[
                  stylesScaled.articleTextElement,
                  {
                    backgroundColor: "yellow",
                    width: screenWidth
                  }
                ]}
              >
                {text.slice(slicePoint)}
              </Text>
            </View>
          );
        }}
      </Context.Consumer>
    );
  }

  render() {
    const { children } = this.props;
    const { slicePoint } = this.state;

    return slicePoint > 0 ? this.renderParagraph(children) : null;
  }
}

DropCapParagraph.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default DropCapParagraph;
