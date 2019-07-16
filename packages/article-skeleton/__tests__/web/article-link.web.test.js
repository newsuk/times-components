import React from "react";
import TestRenderer from "react-test-renderer";

import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";

import "../mocks.web";
import ArticleLink from "../../src/article-body/article-link.web";

const omitProps = new Set([
  "article",
  "className",
  "responsiveLinkStyles",
  "style"
]);

describe("Article Link", () => {
  const props = {
    dropCap: true,
    onPress: null,
    url: "www.example.com",
    target: "target",
    children: ["A"]
  };

  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform((value, key) => omitProps.has(key))
    )
  );

  it("should render with the dropCap link not underlined", () => {
    const testRenderer = TestRenderer.create(<ArticleLink {...props} />);
    expect(testRenderer).toMatchSnapshot();
  });

  it("should render with the link underlined", () => {
    props.children = ["a link"];

    const testRenderer = TestRenderer.create(<ArticleLink {...props} />);
    expect(testRenderer).toMatchSnapshot();
  });
});
