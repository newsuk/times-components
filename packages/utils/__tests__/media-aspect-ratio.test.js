import React from "react";
import { TcText } from "@times-components/utils";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import AspectRatioContainer from "../src/media-aspect-ratio";

addSerializers(
  expect,
  compose(
    print,
    minimalNativeTransform,
    minimaliseTransform((value, key) => key !== "style"),
    flattenStyleTransform
  )
);

describe("AspectRatioContainer should", () => {
  it("provide an appropriate container with childen based on a given aspect ratio", () => {
    const testInstance = TestRenderer.create(
      <AspectRatioContainer aspectRatio="16:9">
        <TcText>Here are some children</TcText>
      </AspectRatioContainer>
    );
    expect(testInstance).toMatchSnapshot();
  });
});
