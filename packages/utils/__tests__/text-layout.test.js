import React, { Component } from "react";
import { Text, View } from "react-native";
import TestRenderer from "react-test-renderer";
import { delay } from "@times-components/test-utils";
import PropTypes from "prop-types";
import {
  InlineElement,
  measureContainer,
  measureElements,
  layoutText
} from "../src/text-layout";

const callAllLayouts = async testInstance => {
  await delay(0);
  testInstance.root.findAllByType(Text).forEach(word => {
    const { onLayout } = word.props;
    if (onLayout) {
      const width = word.props.children.length;
      onLayout({
        nativeEvent: {
          layout: {
            height: 18,
            width
          }
        }
      });
    }
  });

  testInstance.root.findAllByType(View).forEach(view => {
    const { onLayout } = view.props;
    if (onLayout) {
      onLayout({
        nativeEvent: {
          layout: {
            height: 100,
            width: 100
          }
        }
      });
    }
  });
  await delay(0);
};

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      height: null,
      needsLayout: true
    };
  }

  async componentDidMount() {
    const { elements, results } = measureElements(this.renderChildren());
    this.setState({
      content: elements
    });
    const sizes = await results;
    const [laidOut, height] = layoutText(500, sizes);
    this.setState({
      content: laidOut,
      height,
      needsLayout: false
    });
  }

  renderChildren() {
    const { text } = this.props;
    return [
      <InlineElement align="left" key="test-inline" start={0}>
        {style => (
          <View key="test" style={[{ height: 100, width: 100 }, style]} />
        )}
      </InlineElement>,
      <Text key="content" style={{ fontSize: 18 }}>
        {text}
      </Text>
    ];
  }

  render() {
    const { content, needsLayout, height } = this.state;
    return (
      <View style={{ height }}>
        {!needsLayout && content}
        {content.length !== 0 && needsLayout && measureContainer(content)}
      </View>
    );
  }
}

TestComponent.propTypes = {
  text: PropTypes.string.isRequired
};

describe("for text float layout", () => {
  it("should calculate text layout", async () => {
    const testInstance = TestRenderer.create(
      <TestComponent text="Test text foo bar baz" />
    );
    await callAllLayouts(testInstance);
    expect(testInstance).toMatchSnapshot();
  });
});
