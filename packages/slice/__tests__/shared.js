import { Text } from "react-native";
import React from "react";
import renderer from "react-test-renderer";
import context from "jest-context";
import singleRelatedArticleFixture from "@times-components/article/related-articles/fixtures/single-related-article.json";
import singleRelatedArticleNoImageFixture from "@times-components/article/related-articles/fixtures/single-related-article-no-image.json";
import singleRelatedArticleNoLabelFixture from "@times-components/article/related-articles/fixtures/single-related-article-no-label.json";
import singleRelatedArticleNoBylineFixture from "@times-components/article/related-articles/fixtures/single-related-article-no-byline.json";
import Slice from "../slice";

module.exports = () => {
  context("Related articles", () => {
    it("renders null for a slice with no children", () => {
      const tree = renderer.create(<Slice />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders null for a slice with no children", () => {
      const tree = renderer
        .create(
          <Slice>
            <Text>Test text</Text>
          </Slice>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders null for a slice with no children", () => {
      const tree = renderer
        .create(
          <Slice>
            <Text>Test text 1</Text>
            <Text>Test text 2</Text>
          </Slice>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
