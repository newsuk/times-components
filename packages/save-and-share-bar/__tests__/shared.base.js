import React from "react";
import TestRenderer from "react-test-renderer";
import saveApi from "@times-components/save-star-web/mock-save-api";
import { Clipboard } from "react-native";
import "./mocks";
import { delay } from "@times-components/test-utils";
import BarItem from "../src/bar-item";
import SaveAndShareBar from "../src/save-and-share-bar";

export default () => {
  describe("save and share bar component", () => {
    const onCopyLink = jest.fn();
    const articleId = "96508c84-6611-11e9-adc2-05e1b87efaea";
    const articleUrl = "https://www.thetimes.co.uk/";
    const articleHeadline = "test-headline";
    const mockGetTokenisedArticleUrl = id =>
      Promise.resolve({
        data: {
          article: {
            tokenisedUrl: `https://www.thetimes.co.uk/article/${id}?shareToken=333310c5af52a3c6e467e3b15516c950`
          }
        },
        loading: false
      });

    let testInstance = null;

    beforeEach(() => {
      testInstance = TestRenderer.create(
        <SaveAndShareBar
          articleId={articleId}
          articleUrl={articleUrl}
          articleHeadline={articleHeadline}
          onCopyLink={onCopyLink}
          getTokenisedShareUrl={mockGetTokenisedArticleUrl}
          saveApi={saveApi}
          sharingEnabled
          savingEnabled
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

    it("email icon with loading state while network request is fetching data", async () => {
      const apiMock = () =>
        Promise.resolve({
          loading: true
        });

      testInstance = TestRenderer.create(
        <SaveAndShareBar
          articleId={articleId}
          articleUrl={articleUrl}
          articleHeadline={articleHeadline}
          onCopyLink={onCopyLink}
          getTokenisedShareUrl={apiMock}
          saveApi={saveApi}
          sharingEnabled
          savingEnabled
        />
      );

      testInstance.root.findAllByType(BarItem)[0].props.onPress();
      await delay(0);
      expect(testInstance).toMatchSnapshot();
    });

    it("fetches tokenised article url and change window.location", async () => {
      /* eslint-env browser */
      window.location.assign = jest.fn();

      const mock = await mockGetTokenisedArticleUrl(articleId);
      const { url } = mock.data.article.tokenisedUrl;

      const mailtoUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${url}`;

      testInstance.root.findAllByType(BarItem)[0].props.onPress();
      await delay(100);
      expect(window.location.assign).toBeCalledWith(mailtoUrl);
    });
  });
};
