import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import Button from "@times-components/button";
import ArticleError from "../src/article-error";

const shared = () => {
  it("refetch button is clickable", () => {
    const refetch = jest.fn();
    const testInstance = TestRenderer.create(
      <ArticleError refetch={refetch} />
    );

    testInstance.root.findByType(Button).props.onPress();
    expect(refetch).toHaveBeenCalled();
  });
};

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key === "style" || key === "testID")
    )
  );

  shared();
};
