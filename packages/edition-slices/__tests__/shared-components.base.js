import React from "react";
import TestRenderer from "react-test-renderer";
import { ArticleSummaryHeadline } from "@times-components/article-summary";
import { iterator } from "@times-components/test-utils";
import { mockEditionSlice } from "@times-components/fixture-generator";

import TileSummary from "../src/tiles/shared/tile-summary";

jest.mock("@times-components/article-flag", () => ({
  ArticleFlags: "ArticleFlags"
}));

const tile = mockEditionSlice(1).items[0];

export default () => {
  const tests = [
    {
      name:
        "Tile summary falls back to headline if shortHeadline is unavailable",
      test: () => {
        const tileWithoutShortHeadline = {
          ...tile,
          article: {
            ...tile.article,
            shortHeadline: ""
          }
        };

        const output = TestRenderer.create(
          <TileSummary tile={tileWithoutShortHeadline} />
        );

        expect(
          output.root.findByType(ArticleSummaryHeadline).props.headline
        ).toEqual(tileWithoutShortHeadline.article.headline);
      }
    }
  ];

  iterator(tests);
};
