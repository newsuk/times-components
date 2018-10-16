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

    if (prevProps.scale !== this.props.scale) {
      this.measureTextBoxes(dropCap, text, scale);
    }
  }

  measureTextBoxes() {
    const { dropCap, scale, text } = this.props;
    const stylesScaled = styleFactory(scale);

    const { screenWidth } = this.state;

    const {
      dropCapTextElement: {
        fontFamily: dropCapFontFamily,
        fontSize: dropCapSize,
        marginRight: dropCapRight
      },
      articleTextElement: { fontFamily, fontSize },
      articleMainContentRow: { paddingLeft, paddingRight }
    } = stylesScaled;

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
    const { colour, dropCap, scale, text } = this.props;
    const { screenWidth, slicePoint } = this.state;

    const stylesScaled = styleFactory(scale);
    const { paddingLeft, paddingRight } = stylesScaled.articleMainContentRow;

    return (
      <View
        style={[
          stylesScaled.articleMainContentRow,
          stylesScaled.dropCapContainer
        ]}
      >
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
