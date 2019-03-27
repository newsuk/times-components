import React from "react";
import { NativeModules } from "react-native";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { delay } from "@times-components/test-utils";
import "./mocks";
import SectionPage from "../src/section/section";

jest.mock("@times-components/section", () => {
  const { SectionContext } = require.requireActual("@times-components/context");

  return () => (
    <SectionContext.Consumer>
      {({ recentlyOpenedPuzzleCount }) => recentlyOpenedPuzzleCount}
    </SectionContext.Consumer>
  );
});

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key === "style")
    )
  );

  it("puzzle count uses initial prop and gets updated with the bridge", async () => {
    const {
      SectionEvents: { getOpenedPuzzleCount }
    } = NativeModules;

    const initialCount = 1;
    const count = 12;

    getOpenedPuzzleCount.mockReturnValue(Promise.resolve(count));

    const testInstance = TestRenderer.create(
      <SectionPage
        recentlyOpenedPuzzleCount={initialCount}
        section={{ name: "PuzzleSection", slices: [] }}
      />
    );

    // Initial Count
    expect(testInstance.toJSON()).toEqual(`${initialCount}`);

    // Updated Count with native bridge
    await delay(0);
    expect(testInstance.toJSON()).toEqual(`${count}`);
  });
};
