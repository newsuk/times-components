import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleFlag, {
  ArticleFlags,
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
      name: "hex colour article flag",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleFlag color="#FF0000" title="Coloured Red" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "rgba colour article flag",
      test: () => {
        const gqlRgbaColour = {
          rgba: {
            alpha: 1,
            blue: 8,
            green: 3,
            red: 11
          }
        };
        const testInstance = TestRenderer.create(
          <ArticleFlag color={gqlRgbaColour} title="Coloured Red" />
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
    },
    {
      name: "article flags",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleFlags flags={["UPDATED", "EXCLUSIVE"]} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
