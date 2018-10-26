import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import ArticleError from "../src/article-error";

const shared = () => {
  it("renders correctly with style", () => {
    const testInstance = TestRenderer.create(
      <ArticleError refetch={() => null} />
    );

    expect(testInstance).toMatchSnapshot();
  });
};

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimalNativeTransform
    )
  );

  shared();
};
