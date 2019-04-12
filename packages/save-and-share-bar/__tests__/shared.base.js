import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import SaveAndShareBar from "../src/save-and-share-bar";
import Link from "@times-components/link";

jest.mock("@times-components/link", () => "Link");

jest.mock("@times-components/icons", () => ({
  IconEmail: "IconEmail",
  IconFacebook: "IconFacebook",
  IconTwitter: "IconTwitter",
  IconSaveBookmark: "IconSaveBookmark",
  IconCopyLink: "IconCopyLink"
}));

export default () => {
  const tests = [
    {
      name: "save and share bar renders correctly",
      test: () => {
        const testInstance = TestRenderer.create(
          <SaveAndShareBar
            articleUrl=""
            onCopyLink={() => { }}
            onSaveToMyArticles={() => { }}
            onShareOnEmail={() => { }}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "onPress events triggers correctly",
      test: () => {

        const onShareOnEmail = jest.fn();
        const onCopyLink = jest.fn();
        const onSaveToMyArticles = jest.fn();

        const testInstance = TestRenderer.create(
          <SaveAndShareBar
            articleUrl=""
            onCopyLink={onCopyLink}
            onSaveToMyArticles={onSaveToMyArticles}
            onShareOnEmail={onShareOnEmail}
          />
        );

        testInstance.root.findAllByType(Link)[0].props.onPress();
        expect(onShareOnEmail).toHaveBeenCalled();

        testInstance.root.findAllByType(Link)[3].props.onPress();
        expect(onCopyLink).toHaveBeenCalled();

        testInstance.root.findAllByType(Link)[4].props.onPress();
        expect(onSaveToMyArticles).toHaveBeenCalled();
      }
    }
  ];
  iterator(tests);
};