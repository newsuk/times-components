import React, { Component } from "react";
import TestRenderer, { act } from "react-test-renderer";
import PropTypes from "prop-types";
import MockedProvider from "../../provider-test-tools/src/mocked-provider";

import mockGetTokenisedArticleUrl from "./mock-get-tokenised-article-url";
import "./mocks";
import { ShareItem } from "../src/components/share-item";
import { OutlineButton } from "../src/styled";
import SaveAndShareBar from "../src/save-and-share-bar";

const mockEvent = {
  preventDefault: () => {}
};

class WithTrackingContext extends Component {
  getChildContext() {
    const { analyticsStream } = this.props;
    return {
      tracking: {
        analytics: analyticsStream
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
  analyticsStream: PropTypes.func.isRequired,
  articleUrl: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  onCopyLink: PropTypes.func.isRequired
};

export default () => {
  describe("save and share tracking events", () => {
    const onCopyLink = jest.fn();
    const onShareOnFB = jest.fn();
    const onShareOnTwitter = jest.fn();
    const onShareEmail = jest.fn();
    const articleId = "id-123";
    const articleHeadline = "test-headline";
    const articleUrl = "https://www.thetimes.co.uk/";
    const getTokenisedShareUrl = jest.fn(mockGetTokenisedArticleUrl);

    let stream = null;
    let realLocation;

    const TestComponent = () => (
      <MockedProvider>
        <WithTrackingContext
          analyticsStream={stream}
          articleUrl={articleUrl}
          articleId={articleId}
          articleHeadline={articleHeadline}
          onCopyLink={onCopyLink}
          onShareOnFB={onShareOnFB}
          onShareOnTwitter={onShareOnTwitter}
          getTokenisedShareUrl={getTokenisedShareUrl}
          onShareEmail={onShareEmail}
          sharingEnabled
          savingEnabled
        />
      </MockedProvider>
    );

    beforeEach(() => {
      stream = jest.fn();
      realLocation = global.window.location;
      delete global.window.location;
      global.window.location = {
        assign: jest.fn(),
        search: ""
      };
    });

    afterEach(() => {
      delete global.window.location;
      global.window.location = realLocation;
    });

    it("when press share on twitter", () => {
      const testInstance = TestRenderer.create(<TestComponent />);
      act(() => {
        testInstance.root
          .findAllByType(OutlineButton)[0]
          .props.onClick(mockEvent);
      });
      const shareOnTwitterBarItem = testInstance.root.findAllByType(
        ShareItem
      )[1];
      shareOnTwitterBarItem.props.onClick();
      const call = stream.mock.calls[0][0];
      expect(call).toMatchSnapshot();
      expect(onShareOnTwitter.mock.calls).toMatchSnapshot("onShareOnTwitter");
    });

    it("when press share on facebook", () => {
      const testInstance = TestRenderer.create(<TestComponent />);
      act(() => {
        testInstance.root
          .findAllByType(OutlineButton)[0]
          .props.onClick(mockEvent);
      });
      const shareOnFacebookBarItem = testInstance.root.findAllByType(
        ShareItem
      )[2];
      shareOnFacebookBarItem.props.onClick();

      const call = stream.mock.calls[0][0];

      expect(call).toMatchSnapshot();
      expect(onShareOnFB.mock.calls).toMatchSnapshot("onShareOnFB");
    });

    xit("when press copy to clipboard", () => {
      const testInstance = TestRenderer.create(<TestComponent />);
      act(() => {
        testInstance.root
          .findAllByType(OutlineButton)[0]
          .props.onClick(mockEvent);
      });
      const copyToClipboardBarItem = testInstance.root.findAllByType(
        ShareItem
      )[3];
      copyToClipboardBarItem.props.onClick(mockEvent);

      const call = stream.mock.calls[0][0];

      expect(call).toMatchSnapshot();
      expect(onCopyLink.mock.calls).toMatchSnapshot("onCopyLink");
    });

    it("when press share article url by email", async () => {
      const testInstance = TestRenderer.create(<TestComponent />);
      act(() => {
        testInstance.root
          .findAllByType(OutlineButton)[0]
          .props.onClick(mockEvent);
      });
      const shareArticleUrlByEmailBarItem = testInstance.root.findAllByType(
        ShareItem
      )[0];
      await shareArticleUrlByEmailBarItem.props.onClick(mockEvent);

      const call = stream.mock.calls[0][0];

      expect(call).toMatchSnapshot();
      expect(onShareEmail.mock.calls).toMatchSnapshot("onShareEmail");
    });
  });
};
