/* eslint-disable no-continue,react/no-did-update-set-state,react/forbid-prop-types */
import React, { Component } from "react";
import { View, Text } from "react-native";
import { renderTree } from "@times-components/markup-forest";
import { flatten } from "@times-components/markup";
import PropTypes from "prop-types";
import { measureElements, layoutText, measureContainer } from "./text-flow";

class FlowText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      needsLayout: true
    };
  }

  componentDidMount() {
    this.calculateLayout();
  }

  componentDidUpdate({ style, scale }) {
    const { style: prevStyle, scale: prevScale } = this.props;
    if (prevStyle.maxWidth !== style.maxWidth || scale !== prevScale) {
      this.setState(
        state => ({
          ...state,
          content: [],
          needsLayout: true
        }),
        () => {
          this.calculateLayout();
        }
      );
    }
  }

  async calculateLayout() {
    const { localRender, textStyle, style, children, markup } = this.props;
    const { needsLayout } = this.state;

    if (!needsLayout) {
      return;
    }

    const inlines = Array.isArray(children) ? children : [children];
    const { maxWidth } = style;
    const nodes = markup.reduce(
      (acc, m) => [...acc, ...renderTree(m, flatten)],
      []
    );

    const { elements, results } = measureElements(inlines, nodes, textStyle);

    this.setState({
      content: elements
    });

    const sizes = await results;

    const [inlineLines, others] = layoutText(maxWidth, sizes, textStyle);

    const noMargins = {
      ...textStyle,
      marginBottom: 0
    };

    const renderedInline = inlineLines.map(line => (
      <Text style={noMargins}>
        {line.map(node => renderTree(node, localRender))}
      </Text>
    ));

    const paragraphs = [[]];
    for (let i = 0; i < others.length; i += 1) {
      const line = others[i];
      if (!line[0].name) {
        paragraphs.push([]);
        continue;
      }
      paragraphs[paragraphs.length - 1].push(
        line.map(node => renderTree(node, localRender))
      );
    }

    const renderedRest = paragraphs.map(para => (
      <Text style={textStyle}>{para}</Text>
    ));

    this.setState({
      content: (
        <View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {inlines[0].props.children(sizes.inlineSizes[0])}
            <View>{renderedInline}</View>
          </View>
          {renderedRest}
        </View>
      ),
      needsLayout: false
    });
  }

  render() {
    const { content, needsLayout } = this.state;
    const { markup, localRender } = this.props;
    if (needsLayout) {
      return (
        <View>
          {markup.map(paragraph => renderTree(paragraph, localRender))}
          {measureContainer(content)}
        </View>
      );
    }
    return content;
  }
}

FlowText.propTypes = {
  localRender: PropTypes.object.isRequired,
  markup: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.shape({
        value: PropTypes.string
      }),
      children: PropTypes.array,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  scale: PropTypes.string.isRequired,
  style: PropTypes.shape({
    maxWidth: PropTypes.number
  }).isRequired,
  textStyle: PropTypes.shape({
    marginBottom: PropTypes.number
  }).isRequired
};

export default FlowText;
