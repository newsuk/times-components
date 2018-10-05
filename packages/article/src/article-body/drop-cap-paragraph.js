import React, { Component } from "react";
import { Dimensions, NativeModules, Text, View } from "react-native";
import PropTypes from "prop-types";

class DropCapParagraph extends Component {
  constructor(props) {
    super(props);

    const { ReactTextHelper } = NativeModules;
    const screenWidth = Dimensions.get("window").width;
    this.state = {
      slicePoint: 0,
      screenWidth: screenWidth
    };
    const margins = 30;

    ReactTextHelper
      .measureSlicePoint(props.children.toString(), 65, 17, screenWidth - margins)
      .then(({ slicePoint, textViewWidth }) => {
        this.setState({ slicePoint, textViewWidth });
      })
  }

  renderParagraph(children, styles) {
    const text = children.toString();
    const { screenWidth, slicePoint, textViewWidth } = this.state;

    return (<View
      style={{
        backgroundColor: "blue",
        flexDirection: "row",
        flexWrap: "wrap"
      }}
    >
      <Text
        selectable
        style={[
          styles.articleTextElement,
          {
            backgroundColor: "red",
            fontSize: 65,
            lineHeight: 70,
            height: 70,
            marginBottom: 0
          }
        ]}
        onLayout={({ nativeEvent: { layout: { x, width } } }) => {
          console.log("DropCap Width:", width);
        }}
      >
        {text.charAt(0)}
      </Text>
      <Text
        selectable
        style={[
          styles.articleTextElement,
          {
            flex: 1,
            backgroundColor: "green",
            marginBottom: 0
          }
        ]}
        onLayout={({ nativeEvent: { layout: { width } } }) => {
          console.log("Width:", width, "NativeWidth:", textViewWidth);
        }}
      >
        {text.slice(1, slicePoint)}
      </Text>

      <Text
        selectable
        style={[
          styles.articleTextElement,
          {
            backgroundColor: "yellow",
            width: screenWidth
          }
        ]}
      >
        {text.slice(slicePoint)}
      </Text>
    </View>);
  }

  render() {
    const { children, styles } = this.props;
    const { slicePoint } = this.state;

    return slicePoint > 0 ?
      (this.renderParagraph(children, styles)) : null;
  }
}

DropCapParagraph.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default DropCapParagraph;
