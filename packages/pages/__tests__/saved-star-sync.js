import React from "react";
import { NativeModules, View } from "react-native";
import TestRenderer from "react-test-renderer";
import { delay } from "@times-components/test-utils";
import "./mocks";
import SectionPage from "../src/section/section";

jest.mock("@times-components/section", () => {
  const { View: RNView } = require.requireActual("react-native");
  const { SectionContext } = require.requireActual("@times-components/context");

  return () => (
    <SectionContext.Consumer>
      {({ onArticleSavePress, savedArticles }) => (
        <RNView onPress={onArticleSavePress}>
          {`Saved Articles: ${JSON.stringify(savedArticles)}`}
        </RNView>
      )}
    </SectionContext.Consumer>
  );
});

export default () => {
  it("saved article integration", async () => {
    const {
      SectionEvents: { getSavedArticles, onArticleSavePress }
    } = NativeModules;

    getSavedArticles.mockReturnValue(Promise.resolve(["123", "456"]));
    onArticleSavePress.mockReturnValue(Promise.resolve(true));

    const testInstance = TestRenderer.create(
      <SectionPage section={{ name: "News", slices: [] }} />
    );

    await delay(0);
    expect(testInstance.toJSON()).toMatchSnapshot("initial sync");

    const [
      {
        props: { onPress }
      }
    ] = testInstance.root.findAllByType(View);

    onPress(true, "789");
    await delay(0);
    expect(testInstance.toJSON()).toMatchSnapshot("save article 789");

    onPress(false, "456");
    await delay(0);
    expect(testInstance.toJSON()).toMatchSnapshot("unsave article 456");
  });
};
