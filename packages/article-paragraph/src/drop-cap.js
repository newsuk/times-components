import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { ResponsiveContext } from "@times-components/responsive";
import {
  measureElements,
  measureContainer,
  layoutText,
  InlineElement,
  screenWidth
} from "@times-components/utils";
import styleFactory from "./styles";
import { propTypes, defaultProps } from "./drop-cap-prop-types";

class DropCapParagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      height: null,
      needsLayout: true,
      screenWidth: screenWidth(props.isTablet)
    };
  }

  componentDidMount() {
    this.calculateLayout();
  }

  componentDidUpdate(prev) {
    const { scale, font, text, dropCap, isTablet } = this.props;
    const {
      scale: pScale,
      font: pFont,
      text: pText,
      dropCap: pDropCap,
      isTablet: pIsTablet
    } = prev;
    if (
      scale !== pScale ||
      font !== pFont ||
      text !== pText ||
      dropCap !== pDropCap ||
      isTablet !== pIsTablet
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        {
          content: [],
          height: null,
          needsLayout: true,
          screenWidth: screenWidth(isTablet)
        },
        () => {
          this.calculateLayout();
        }
      );
    }
  }

  async calculateLayout() {
    const { font, scale, isTablet } = this.props;
    const { elements, results } = measureElements(this.renderChildren());
    const {
      articleMainContentRow: { paddingLeft, paddingRight }
    } = styleFactory(font, scale);
    const { screenWidth: width } = this.state;
    this.setState({
      content: elements
    });
    const sizes = await results;
    const padding = isTablet ? width : width - (paddingLeft + paddingRight);
    const [laidOut, height] = layoutText(padding, sizes);
    this.setState({
      content: laidOut,
      height,
      needsLayout: false
    });
  }

  renderChildren() {
    const { colour, dropCap, font, scale, text } = this.props;
    const stylesThemedAndScaled = styleFactory(font, scale);

    return [
      <InlineElement align="left" start={0}>
        {style => (
          <View key="dropcap" style={[style]}>
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
          </View>
        )}
      </InlineElement>,
      <Text selectable style={stylesThemedAndScaled.articleTextElement}>
        {text}
      </Text>
    ];
  }

  render() {
    const { font, scale, text, dropCap, isTablet } = this.props;
    const { height, needsLayout, content } = this.state;
    const stylesThemedAndScaled = styleFactory(font, scale);

    return (
      <View
        style={[
          stylesThemedAndScaled.articleMainContentRow,
          stylesThemedAndScaled.dropCapContainer,
          {
            height
          },
          isTablet && stylesThemedAndScaled.dropCapContainerTablet
        ]}
      >
        {needsLayout === true && (
          <Text selectable style={[stylesThemedAndScaled.articleTextElement]}>
            {dropCap + text}
          </Text>
        )}
        {content.length !== 0 && measureContainer(content)}
      </View>
    );
  }
}

DropCapParagraph.propTypes = {
  ...propTypes,
  dropCap: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

DropCapParagraph.defaultProps = defaultProps;

export default props => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => (
      <DropCapParagraph {...props} isTablet={isTablet}>
        {props.children}
      </DropCapParagraph>
    )}
  </ResponsiveContext.Consumer>
);
