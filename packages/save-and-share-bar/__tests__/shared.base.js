import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { Clipboard } from "react-native";
import "./mocks";
import BarItem from "../src/bar-item";
import SaveAndShareBar from "../src/save-and-share-bar";

export default () => {
  const tests = [
    {
      name: "save and share bar renders correctly",
      test: () => {
        const testInstance = TestRenderer.create(
          <SaveAndShareBar
            articleUrl=""
            onCopyLink={() => {}}
            onSaveToMyArticles={() => {}}
            onShareOnEmail={() => {}}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
        expect(testInstance.root.findAllByType(BarItem)).toHaveLength(5);
      }
    },
    {
      name: "onPress events triggers correctly",
      test: () => {
        const onShareOnEmail = jest.fn();
        const onCopyLink = jest.fn();
        const onSaveToMyArticles = jest.fn();
        const articleUrlMock = "articleUrlMock";

        const testInstance = TestRenderer.create(
          <SaveAndShareBar
            articleUrl={articleUrlMock}
            onCopyLink={onCopyLink}
            onSaveToMyArticles={onSaveToMyArticles}
            onShareOnEmail={onShareOnEmail}
          />
        );

        testInstance.root.findAllByType(BarItem)[0].props.onPress();
        expect(onShareOnEmail).toHaveBeenCalled();

        testInstance.root.findAllByType(BarItem)[3].props.onPress();
        expect(Clipboard.setString).toHaveBeenCalledWith(articleUrlMock);
        expect(onCopyLink).toHaveBeenCalled();

        testInstance.root.findAllByType(BarItem)[4].props.onPress();
        expect(onSaveToMyArticles).toHaveBeenCalled();
      }
    }
  ];
  iterator(tests);
};
