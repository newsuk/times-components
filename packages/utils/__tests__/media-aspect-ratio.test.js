import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import TcText from "../src/tc-text";
import AspectRatioContainer from "../src/media-aspect-ratio";

addSerializers(
  expect,
  compose(
    print,
    minimaliseTransform((value, key) => key !== "style")
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
