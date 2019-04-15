import React, { Component } from "react";
import PropTypes from "prop-types";
import { MockEdition } from "@times-components/fixture-generator";
import Link from "@times-components/link";
import { SectionContext } from "@times-components/context";
import StarButton from "@times-components/star-button";
import TestRenderer from "react-test-renderer";
import Section from "../src/section";

jest.mock("@times-components/icons", () => ({
  IconForwardArrow: "IconForwardArrow",
  IconStar: "IconStar"
}));

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
    expect(onArticlePress.mock.calls).toMatchSnapshot("onArticlePress");
  });

  it("Save/Unsave article click tracking", () => {
    const edition = new MockEdition().get();
    const stream = jest.fn();
    const onArticlePress = jest.fn();
    const artickleId = edition.sections[0].slices[0].lead.article.id;
    const savedArticles = { artickleId: undefined };
    const onArticleSavePress = () => {
      savedArticles[artickleId] = !savedArticles[artickleId];
    };

    const testInstance = TestRenderer.create(
      <SectionContext.Provider value={{ onArticleSavePress, savedArticles }}>
        <WithTrackingContext
          onArticlePress={onArticlePress}
          onPuzzlePress={() => {}}
          section={edition.sections[0]}
          stream={stream}
        />
      </SectionContext.Provider>
    );

    const [starButton] = testInstance.root.findAllByType(StarButton);
    starButton.props.onPress();
    starButton.props.onPress();

    const call = stream.mock.calls;
    expect(call).toMatchSnapshot();
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
    expect(onPuzzlePress.mock.calls).toMatchSnapshot("onPuzzlePress");
  });
};
