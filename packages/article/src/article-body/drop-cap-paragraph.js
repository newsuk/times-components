import React, { Component } from "react";
import { Dimensions, NativeModules, Text, View } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import styleguide from "@times-components/styleguide";
import styleFactory from "../styles/article-body";

const { colours } = styleguide();
const { RNTextSize } = NativeModules;

const dropCapSize = 67;
const fontSize = 17;

class DropCapParagraph extends Component {
  constructor(props) {
    super(props);

    const screenWidth = Dimensions.get("window").width;
    this.state = {
      slicePoint: 0,
      screenWidth
    };
    const text = this.props.children.toString();
    const margins = 25;
    const dropCapLength = 1;

    RNTextSize.measure({
      text: text.slice(0, dropCapLength),
      width: screenWidth - margins,
      fontSize: dropCapSize,
      fontFamily: "TimesDigitalW04",
    }).then(({ width }) => RNTextSize.measure({
      text: text.slice(dropCapLength),
      width: screenWidth - margins - width,
      fontSize: fontSize,
      fontFamily: "TimesDigitalW04"
    })).then(({ lineEnd }) => {
      this.setState({ slicePoint: lineEnd + dropCapLength, screenWidth });
    });
  }

  renderParagraph(children) {
    const text = children.toString();
    const { screenWidth, slicePoint } = this.state;

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
                selectable
                style={
                  {
                    backgroundColor: "red",
                    fontSize: dropCapSize,
                    fontFamily: "TimesDigitalW04",
                    lineHeight: dropCapSize,
                    includeFontPadding: false,
                    textAlignVertical: "bottom",
                    marginRight: 5,
                    color: colours.functional.primary
                  }
                }
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
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default DropCapParagraph;
