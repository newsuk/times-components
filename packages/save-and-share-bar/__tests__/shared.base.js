import React from "react";
import TestRenderer from "react-test-renderer";
import { Clipboard } from "react-native";
import "./mocks";
import BarItem from "../src/bar-item";
import SaveAndShareBar from "../src/save-and-share-bar";

export default () => {
  describe("save and share bar component", () => {
    const onShareOnEmail = jest.fn();
    const onCopyLink = jest.fn();
    const onSaveToMyArticles = jest.fn();
    const articleId = "id-123";
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
          onSaveToMyArticles={onSaveToMyArticles}
          onShareOnEmail={onShareOnEmail}
        />
      );
    });

    it("save and share bar renders correctly", () => {
      expect(testInstance.toJSON()).toMatchSnapshot();
      expect(testInstance.root.findAllByType(BarItem)).toHaveLength(5);
    });

    it("onPress events triggers correctly", () => {
      testInstance.root.findAllByType(BarItem)[0].props.onPress();
      expect(onShareOnEmail).toHaveBeenCalled();

      testInstance.root.findAllByType(BarItem)[3].props.onPress();
      expect(Clipboard.setString).toHaveBeenCalledWith(articleUrl);
      expect(onCopyLink).toHaveBeenCalled();

      testInstance.root.findAllByType(BarItem)[4].props.onPress();
      expect(onSaveToMyArticles).toHaveBeenCalled();
    });
  });
};
