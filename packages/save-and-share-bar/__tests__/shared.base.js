import React from "react";
import TestRenderer from "react-test-renderer";
import saveApi from "@times-components/save-star-web/mock-save-api";
import { Clipboard } from "react-native";
import "./mocks";
import mockGetTokenisedArticleUrl from "./mock-get-tokenised-article-url";
import BarItem from "../src/bar-item";
import SaveAndShareBar from "../src/save-and-share-bar";

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

      await testInstance.root.findAllByType(BarItem)[0].props.onPress();

      expect(testInstance).toMatchSnapshot();
    });

    it("fetches tokenised article url and change window.location", async () => {
      /* eslint-env browser */
      window.location.assign = jest.fn();

      const mock = await mockGetTokenisedArticleUrl(articleId);
      const { url } = mock.data.article.tokenisedUrl;

      const mailtoUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${url}`;

      await testInstance.root.findAllByType(BarItem)[0].props.onPress();
      expect(window.location.assign).toBeCalledWith(mailtoUrl);
    });
  });
};
