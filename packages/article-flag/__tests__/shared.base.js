import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleFlag, {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
} from "../src/article-flag";

export default () => {
  const tests = [
    {
      name: "article flag",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleFlag title="No Colour" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "red article flag",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleFlag color="red" title="Coloured Red" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "new article flag",
      test: () => {
        const testInstance = TestRenderer.create(<NewArticleFlag />);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "updated article flag",
      test: () => {
        const testInstance = TestRenderer.create(<UpdatedArticleFlag />);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "exclusive article flag",
      test: () => {
        const testInstance = TestRenderer.create(<ExclusiveArticleFlag />);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "sponsored article flag",
      test: () => {
        const testInstance = TestRenderer.create(<SponsoredArticleFlag />);

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
