import React, { Component } from "react";
import TestRenderer from "react-test-renderer";
import PropTypes from "prop-types";
import "./mocks";
import BarItem from "../src/bar-item";
import SaveAndShareBar from "../src/save-and-share-bar";

class WithTrackingContext extends Component {
  getChildContext() {
    const { analyticStream } = this.props;
    return {
      tracking: {
        analytics: analyticStream
      }
    };
  }

  render() {
    const {
      articleUrl,
      onCopyLink,
      onSaveToMyArticles,
      onShareOnEmail
    } = this.props;
    return (
      <SaveAndShareBar
        articleUrl={articleUrl}
        onCopyLink={onCopyLink}
        onSaveToMyArticles={onSaveToMyArticles}
        onShareOnEmail={onShareOnEmail}
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
  analyticStream: PropTypes.func.isRequired,
  articleUrl: PropTypes.string.isRequired,
  onCopyLink: PropTypes.func.isRequired,
  onSaveToMyArticles: PropTypes.func.isRequired,
  onShareOnEmail: PropTypes.func.isRequired
};

export default () => {
  describe("save and share tracking events", () => {
    const stream = jest.fn();
    const onShareOnEmail = jest.fn();
    const onCopyLink = jest.fn();
    const onSaveToMyArticles = jest.fn();
    const articleUrl = "dummy-url";

    let testInstance;

    beforeEach(() => {
      testInstance = TestRenderer.create(
        <WithTrackingContext
          analyticStream={stream}
          articleUrl={articleUrl}
          onCopyLink={onCopyLink}
          onSaveToMyArticles={onSaveToMyArticles}
          onShareOnEmail={onShareOnEmail}
        />
      );
    });

    it("when press share on email", () => {
      const shareOnEmailBarItem = testInstance.root.findAllByType(BarItem)[0];

      shareOnEmailBarItem.props.onPress();

      const [[call]] = stream.mock.calls;

      expect(call).toMatchSnapshot();
      expect(onShareOnEmail.mock.calls).toMatchSnapshot("onShareOnEmail");
    });

    it("when press copy to clipboard", () => {
      const copyToClipboardBarItem = testInstance.root.findAllByType(
        BarItem
      )[3];
      copyToClipboardBarItem.props.onPress();

      const [[call]] = stream.mock.calls;

      expect(call).toMatchSnapshot();
      expect(onCopyLink.mock.calls).toMatchSnapshot("onCopyLink");
    });

    it("when press copy to clipboard", () => {
      const saveToMyArticlesBarItem = testInstance.root.findAllByType(
        BarItem
      )[4];
      saveToMyArticlesBarItem.props.onPress();

      const [[call]] = stream.mock.calls;

      expect(call).toMatchSnapshot();
      expect(onSaveToMyArticles.mock.calls).toMatchSnapshot(
        "onSaveToMyArticles"
      );
    });
  });
};
