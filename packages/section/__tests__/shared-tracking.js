import React, { Component } from "react";
import PropTypes from "prop-types";
import { MockEdition } from "@times-components/fixture-generator";
import Link from "@times-components/link";
import TestRenderer from "react-test-renderer";
import Section from "../src/section";

class WithTrackingContext extends Component {
  getChildContext() {
    const { stream } = this.props;
    return {
      tracking: {
        analytics: stream
      }
    };
  }

  render() {
    const { onArticlePress, onPuzzlePress, section } = this.props;
    return (
      <Section
        analyticsStream={() => {}}
        onArticlePress={onArticlePress}
        onPuzzlePress={onPuzzlePress}
        publicationName="TIMES"
        section={section}
      />
    );
  }
}

WithTrackingContext.childContextTypes = {
  tracking: PropTypes.shape({
    analytics: PropTypes.func
  })
};

WithTrackingContext.propTypes = {
  onArticlePress: PropTypes.func.isRequired,
  onPuzzlePress: PropTypes.func.isRequired,
  section: PropTypes.shape({}).isRequired,
  stream: PropTypes.func.isRequired
};

export default () => {
  it("default section page click tracking", () => {
    const edition = new MockEdition().get();

    const stream = jest.fn();
    const onArticlePress = jest.fn();

    const testInstance = TestRenderer.create(
      <WithTrackingContext
        onArticlePress={onArticlePress}
        onPuzzlePress={() => {}}
        section={edition.sections[0]}
        stream={stream}
      />
    );
    const [link] = testInstance.root.findAllByType(Link);

    link.props.onPress();

    const [[call]] = stream.mock.calls;

    expect(call).toMatchSnapshot();
    expect(onArticlePress.mock.calls.length).toBeGreaterThan(0);
  });

  it("puzzle section page click tracking", () => {
    const edition = new MockEdition().get();

    const stream = jest.fn();
    const onPuzzlePress = jest.fn();

    const testInstance = TestRenderer.create(
      <WithTrackingContext
        onArticlePress={() => {}}
        onPuzzlePress={onPuzzlePress}
        section={edition.sections[3]}
        stream={stream}
      />
    );

    const [link] = testInstance.root.findAllByType(Link);

    link.props.onPress();

    const [[call]] = stream.mock.calls;

    expect(call).toMatchSnapshot();
    expect(onPuzzlePress.mock.calls.length).toBeGreaterThan(0);
  });
};
