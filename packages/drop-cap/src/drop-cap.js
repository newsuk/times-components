import React, { Component } from "react";
import { Dimensions, NativeModules, Text, View } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import styleguide from "@times-components/styleguide";
import styleFactory from "./styles";

const { colours } = styleguide();
const { RNTextSize } = NativeModules;

const dropCapSize = 67;
const fontSize = 17;

class DropCapParagraph extends Component {
  constructor(props) {
    super(props);
    const { children } = this.props;
    const screenWidth = Dimensions.get("window").width;
    this.state = {
      slicePoint: 0,
      screenWidth
    };
    const margins = 25;
    const dropCapLength = 1;

    RNTextSize.measure({
      text: children.slice(0, dropCapLength),
      width: screenWidth - margins,
      fontSize: dropCapSize,
      fontFamily: "TimesDigitalW04"
    })
      .then(({ width }) =>
        RNTextSize.measure({
          text: children.slice(dropCapLength),
          width: screenWidth - margins - width,
          fontSize,
          fontFamily: "TimesDigitalW04",
          lineEndForLineNo: 2
        })
      )
      .then(({ lineEnd }) => {
        this.setState({ slicePoint: lineEnd + dropCapLength, screenWidth });
      });
  }

  renderParagraph(text) {
    const { screenWidth, slicePoint } = this.state;

    return (
      <Context.Consumer>
        {({ theme: { scale } }) => {
          const stylesScaled = styleFactory(scale);
          return (
            <View
              style={[
                stylesScaled.articleMainContentRow,
                {
                  flexDirection: "row",
                  flexWrap: "wrap"
                }
              ]}
            >
              <Text
                selectable
                style={{
                  fontSize: dropCapSize,
                  fontFamily: "TimesDigitalW04",
                  lineHeight: dropCapSize,
                  includeFontPadding: false,
                  textAlignVertical: "bottom",
                  marginRight: 5,
                  color: colours.functional.primary
                }}
              >
                {text.charAt(0)}
              </Text>
              <Text
                selectable
                style={[
                  stylesScaled.articleTextElement,
                  {
                    flex: 1,
                    fontSize,
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
                    fontSize,
                    width: screenWidth - 20
                  }
                ]}
              >
                {text.slice(slicePoint + 1)}
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
  children: PropTypes.string.isRequired
};

export default DropCapParagraph;
