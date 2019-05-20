import React from "react";
import TestRenderer from "react-test-renderer";
import saveApi from "@times-components/save-star-web/mock-save-api";
import { Clipboard } from "react-native";
import "./mocks";
import { delay } from "@times-components/test-utils";
import BarItem from "../src/bar-item";
import SaveAndShareBar from "../src/save-and-share-bar";
import mockGetTokenisedEmailUrl from "../src/utils/mock-get-tokenised-email-url";

export default () => {
  describe("save and share bar component", () => {
    const onCopyLink = jest.fn();
    const articleId = "96508c84-6611-11e9-adc2-05e1b87efaea";
    const articleUrl = "https://www.thetimes.co.uk/";
    const articleHeadline = "test-headline";

    let testInstance = null;

    beforeEach(() => {
      testInstance = TestRenderer.create(
        <SaveAndShareBar
          articleId={articleId}
          articleUrl={articleUrl}
          articleHeadline={articleHeadline}
          onCopyLink={onCopyLink}
          onShareOnEmail={mockGetTokenisedEmailUrl}
          saveApi={saveApi}
        />
      );
    });

    it("save and share bar renders correctly", () => {
      expect(testInstance.toJSON()).toMatchSnapshot();
      expect(testInstance.root.findAllByType(BarItem)).toHaveLength(4);
    });

    it("onPress events triggers correctly", () => {
      testInstance.root.findAllByType(BarItem)[3].props.onPress();
      expect(Clipboard.setString).toHaveBeenCalledWith(articleUrl);
      expect(onCopyLink).toHaveBeenCalled();
    });

    it("getTokenisedEmail query to return tokenised url", async () => {
      const mock = await mockGetTokenisedEmailUrl(articleId);
      const {
        data: {
          article: { tokenisedUrl: url }
        }
      } = mock;

      expect(url).toEqual(
        `${articleUrl}article/${articleId}?shareToken=333310c5af52a3c6e467e3b15516c950`
      );
    });

    it("email icon with loading state while network request is fetching data", async () => {
      testInstance.root.findAllByType(BarItem)[0].props.onPress();
      await delay(0);
      expect(testInstance).toMatchSnapshot();
    });
  });
};
