import React, { Component } from "react";
import TestRenderer from "react-test-renderer";
import mockSaveApi from "@times-components/save-star-web/mock-save-api";
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
    return <SaveAndShareBar {...this.props} />;
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
  articleId: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  onCopyLink: PropTypes.func.isRequired,
  onSaveToMyArticles: PropTypes.func.isRequired,
  onShareOnEmail: PropTypes.func.isRequired
};

export default () => {
  describe("save and share tracking events", () => {
    const onShareOnEmail = jest.fn();
    const onCopyLink = jest.fn();
    const onSaveToMyArticles = jest.fn();
    const onShareOnFB = jest.fn();
    const onShareOnTwitter = jest.fn();
    const articleId = "id-123";
    const articleHeadline = "test-headline";
    const articleUrl = "https://www.thetimes.co.uk/";

    let stream = null;
    let testInstance = null;

    beforeEach(() => {
      stream = jest.fn();
      testInstance = TestRenderer.create(
        <WithTrackingContext
          analyticStream={stream}
          articleUrl={articleUrl}
          articleId={articleId}
          articleHeadline={articleHeadline}
          onCopyLink={onCopyLink}
          onSaveToMyArticles={onSaveToMyArticles}
          onShareOnEmail={onShareOnEmail}
          onShareOnFB={onShareOnFB}
          onShareOnTwitter={onShareOnTwitter}
          saveApi={mockSaveApi}
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

    it("when press share on twitter", () => {
      const shareOnTwitterBarItem = testInstance.root.findAllByType(BarItem)[1];
      shareOnTwitterBarItem.props.onPress();

      const [[call]] = stream.mock.calls;

      expect(call).toMatchSnapshot();
      expect(onShareOnTwitter.mock.calls).toMatchSnapshot("onShareOnTwitter");
    });

    it("when press share on facebook", () => {
      const shareOnFacebookBarItem = testInstance.root.findAllByType(
        BarItem
      )[2];
      shareOnFacebookBarItem.props.onPress();

      const [[call]] = stream.mock.calls;

      expect(call).toMatchSnapshot();
      expect(onShareOnFB.mock.calls).toMatchSnapshot("onShareOnFB");
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

    it("when press save to my articles", () => {
      const saveToMyArticlesBarItem = testInstance.root.findAllByType(
        BarItem
      )[3];
      saveToMyArticlesBarItem.props.onPress();

      const [[call]] = stream.mock.calls;

      expect(call).toMatchSnapshot();
      expect(onSaveToMyArticles.mock.calls).toMatchSnapshot(
        "onSaveToMyArticles"
      );
    });
  });
};
