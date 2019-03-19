import React from "react";
import mockDate from "mockdate";
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
  //  GMT: Thursday, 14 March 2019 16:22:54
  beforeEach(() => {
    mockDate.set(1552580574000, 0);
  });

  afterEach(() => {
    mockDate.reset();
  });

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
          <ArticleFlags
            flags={[
              { expiryTime: "2020-03-13T12:00:00.000Z", type: "UPDATED" },
              { expiryTime: "2020-03-14T12:00:00.000Z", type: "EXCLUSIVE" }
            ]}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "article flags with no flags",
      test: () => {
        const testInstance = TestRenderer.create(<ArticleFlags flags={[]} />);

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
