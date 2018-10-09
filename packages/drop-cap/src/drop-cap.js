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
      slicePoint: 0,
      screenWidth: Dimensions.get("window").width
    };
  }

  measureTextBoxes(stylesScaled, dropCap, text, scale) {
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
        this.setState({
          measuredForScale: scale,
          slicePoint,
          screenWidth
        });
      });
  }

  renderParagraph(colour, stylesScaled, dropCap, text) {
    const { screenWidth, slicePoint } = this.state;
    const {
      articleMainContentRow: { paddingLeft, paddingRight }
    } = stylesScaled;

    return (
      <View style={stylesScaled.articleMainContentRow}>
        <Text
          selectable
          style={[
            stylesScaled.dropCapTextElement,
            {
              color: colour
            }
          ]}
        >
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

        <Text
          selectable
          style={[
            stylesScaled.articleTextElement,
            {
              width: screenWidth - paddingLeft - paddingRight
            }
          ]}
        >
          {slicePoint > 0 ? text.slice(slicePoint).trim() : null}
        </Text>
      </View>
    );
  }

  render() {
    const { colour, dropCap, text } = this.props;
    const { measuredForScale } = this.state;

    return (
      <Context.Consumer>
        {({ theme: { scale } }) => {
          const stylesScaled = styleFactory(scale);
          if (measuredForScale === scale) {
            return this.renderParagraph(colour, stylesScaled, dropCap, text);
          }
          this.measureTextBoxes(stylesScaled, dropCap, text, scale);
          return null;
        }}
      </Context.Consumer>
    );
  }
}

DropCapParagraph.propTypes = {
  colour: PropTypes.string,
  dropCap: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

DropCapParagraph.defaultProps = {
  colour: "black"
};

export default DropCapParagraph;
