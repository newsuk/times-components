import React, { Component } from "react";
import { Dimensions, NativeModules, Text, View } from "react-native";
import PropTypes from "prop-types";
import styleFactory from "./styles";
import { propTypes, defaultProps } from "./drop-cap-prop-types";

const { RNTextSize } = NativeModules;

class DropCapParagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: Dimensions.get("window").width
    };
  }

  componentDidMount() {
    const { dropCap, scale, text } = this.props;

    this.measureTextBoxes(dropCap, text, scale);
  }

  componentDidUpdate(prevProps) {
    const { dropCap, scale, text } = this.props;

    if (prevProps.scale !== scale) {
      this.measureTextBoxes(dropCap, text, scale);
    }
  }

  measureTextBoxes() {
    const { dropCap, font, scale, text } = this.props;
    const stylesThemedAndScaled = styleFactory(font, scale);

    const { screenWidth } = this.state;

    const {
      dropCapTextElement: {
        fontFamily: dropCapFontFamily,
        fontSize: dropCapSize,
        marginRight: dropCapRight
      },
      articleTextElement: { fontFamily, fontSize },
      articleMainContentRow: { paddingLeft, paddingRight }
    } = stylesThemedAndScaled;

    const margins = paddingLeft + paddingRight + dropCapRight;

    RNTextSize.measure({
      fontFamily: dropCapFontFamily,
      fontSize: dropCapSize,
      text: dropCap,
      width: screenWidth - margins
    })
      .then(({ width }) =>
        RNTextSize.measure({
          fontFamily,
          fontSize,
          lineEndForLineNo: 2,
          text,
          width: screenWidth - margins - width
        })
      )
      .then(({ lineEnd: slicePoint }) => {
        this.setState({
          slicePoint
        });
      });
  }

  renderParagraph() {
    const { colour, dropCap, font, scale, text } = this.props;
    const { screenWidth, slicePoint } = this.state;

    const stylesThemedAndScaled = styleFactory(font, scale);
    const {
      paddingLeft,
      paddingRight
    } = stylesThemedAndScaled.articleMainContentRow;

    return (
      <View
        style={[
          stylesThemedAndScaled.articleMainContentRow,
          stylesThemedAndScaled.dropCapContainer
        ]}
      >
        <Text
          selectable
          style={[
            stylesThemedAndScaled.dropCapTextElement,
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
            stylesThemedAndScaled.articleTextElement,
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
            stylesThemedAndScaled.articleTextElement,
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
    const { slicePoint } = this.state;

    if (slicePoint !== undefined) {
      return this.renderParagraph();
    }
    return null;
  }
}

DropCapParagraph.propTypes = {
  ...propTypes,
  dropCap: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

DropCapParagraph.defaultProps = defaultProps;

export default DropCapParagraph;
