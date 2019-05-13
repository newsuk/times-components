import React from "react";
import TestRenderer from "react-test-renderer";
import saveApi from "@times-components/save-star-web/mock-save-api";
import { Clipboard } from "react-native";
import "./mocks";
import BarItem from "../src/bar-item";
import SaveAndShareBar from "../src/save-and-share-bar";

export default () => {
  describe("save and share bar component", () => {
    const onShareOnEmail = jest.fn();
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
          onShareOnEmail={onShareOnEmail}
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
      testInstance.root.findAllByType(BarItem)[0].props.onPress();
      expect(onShareOnEmail).toHaveBeenCalled();

      testInstance.root.findAllByType(BarItem)[3].props.onPress();
      expect(Clipboard.setString).toHaveBeenCalledWith(articleUrl);
      expect(onCopyLink).toHaveBeenCalled();
    });
  });
};
