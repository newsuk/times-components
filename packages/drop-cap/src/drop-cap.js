import React, { Component } from "react";
import { Dimensions, NativeModules, Text, View } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import styleFactory from "./styles";

const { RNTextSize } = NativeModules;

class DropCapParagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measured: false,
      slicePoint: 0,
      screenWidth: Dimensions.get("window").width
    };
  }

  measureTextBoxes(stylesScaled, dropCap, text) {
    const { screenWidth } = this.state;

    const {
      dropCapTextElement: { fontSize: dropCapSize, marginRight: dropCapRight },
      articleTextElement: { fontFamily, fontSize },
      articleMainContentRow: { paddingLeft, paddingRight }
    } = stylesScaled;

    const margins = paddingLeft + paddingRight + dropCapRight;

    RNTextSize.measure({
      text: dropCap,
      width: screenWidth - margins,
      fontSize: dropCapSize,
      fontFamily
    })
      .then(({ width }) =>
        RNTextSize.measure({
          text,
          width: screenWidth - margins - width,
          fontSize,
          fontFamily,
          lineEndForLineNo: 2
        })
      )
      .then(({ lineEnd: slicePoint }) => {
        this.setState({ measured: true, slicePoint, screenWidth });
      })
      .catch(err => console.log("Error", err));
  }

  renderParagraph(stylesScaled, dropCap, text) {
    const { screenWidth, slicePoint } = this.state;
    const {
      articleMainContentRow: { paddingLeft, paddingRight }
    } = stylesScaled;

    return (
      <View style={stylesScaled.articleMainContentRow}>
        <Text selectable style={stylesScaled.dropCapTextElement}>
          {dropCap}
        </Text>
        <Text
          selectable
          style={[
            stylesScaled.articleTextElement,
            {
              flex: 1,
              marginBottom: 0
            }
          ]}
        >
          {slicePoint > 0 ? text.slice(0, slicePoint) : text}
        </Text>

        {slicePoint > 0 ? (
          <Text
            selectable
            style={[
              stylesScaled.articleTextElement,
              {
                width: screenWidth - paddingLeft - paddingRight
              }
            ]}
          >
            {text.slice(slicePoint + 1)}
          </Text>
        ) : null}
      </View>
    );
  }

  render() {
    const { dropCap, text } = this.props;
    const { measured } = this.state;

    return (
      <Context.Consumer>
        {({ theme: { scale } }) => {
          const stylesScaled = styleFactory(scale);
          if (measured) {
            return this.renderParagraph(stylesScaled, dropCap, text);
          }
          this.measureTextBoxes(stylesScaled, dropCap, text);
          return null;
        }}
      </Context.Consumer>
    );
  }
}

DropCapParagraph.propTypes = {
  dropCap: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default DropCapParagraph;
