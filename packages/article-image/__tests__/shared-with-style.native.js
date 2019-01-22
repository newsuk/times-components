import "./mocks.native";
import React from "react";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import TestRenderer from "react-test-renderer";
import { mockSetIsTablet as setIsTablet } from "@times-components/responsive";

import ArticleImage from "../src/article-image";
import primaryImageFixture from "../fixtures/primary-image";
import shared from "./shared-with-style.base";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimalNativeTransform
    )
  );

  const makeTest = component => {
    const testInstance = TestRenderer.create(component);
    return testInstance.toJSON();
  }

  shared(makeTest);

  it("should render an ArticleImage with Responsive Tablet styling", () => {
    setIsTablet(true);

    const primaryImage = primaryImageFixture(
      "https://img/someImage",
      "Some caption",
      "Some credits"
    );

    expect(
      makeTest(
        <ArticleImage
          captionOptions={primaryImage.captionOptions}
          imageOptions={primaryImage.imageOptions}
        />
      )
    ).toMatchSnapshot();
  })
};
