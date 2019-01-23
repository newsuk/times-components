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
import Responsive from "@times-components/responsive";
import { setIsTablet } from "@times-components/test-utils/dimensions";

import ArticleImage from "../src/article-image";
import primaryImageFixture from "../fixtures/primary-image";
import shared from "./shared-with-style.base";

jest.mock("@times-components/image", () => ({
  ModalImage: "ModalImage"
}));

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
  };

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
        <Responsive>
          <ArticleImage
            captionOptions={primaryImage.captionOptions}
            imageOptions={primaryImage.imageOptions}
          />
        </Responsive>
      )
    ).toMatchSnapshot();
  });
};
