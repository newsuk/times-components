import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import { ArticleSummaryHeadline } from "@times-components/article-summary";
import { iterator } from "@times-components/test-utils";
import { mockEditionSlice } from "@times-components/fixture-generator";

import { getCrop, TileLink, TileSummary } from "../src/tiles/shared";

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
    },
    {
      name: "Tile Link is clickable",
      test: () => {
        const url = "http://www.thetimes.co.uk";
        const fn = jest.fn();

        const output = TestRenderer.create(
          <TileLink onPress={fn} tile={{ article: { url } }}>
            <Text>Test link</Text>
          </TileLink>
        );

        output.root.findByType(TileLink).props.onPress();

        expect(fn).toHaveBeenCalled();
      }
    },
    {
      name: "getCrop - return null if there is no lead asset",
      test: () => {
        expect(getCrop(null, "crop169")).toEqual(null);
      }
    },
    {
      name: "getCrop - return poster image crop if lead asset is a video",
      test: () => {
        const leadAsset = {
          __typename: "Video",
          posterImage: {
            caption: null,
            credits: null,
            crop169: {
              ratio: "16:9",
              url:
                "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F674e242a-3f8b-11e9-aa0a-30b9d78dd63b.jpg?crop=3483%2C1959%2C9%2C366"
            },
            id: "64806087-c6d0-4104-df61-1faf30525989",
            title: "Potholes"
          }
        };
        expect(getCrop(leadAsset, "crop169")).toEqual(
          leadAsset.posterImage.crop169.url
        );
      }
    },
    {
      name:
        "getCrop - return undefined if lead asset doesnt have the right crop",
      test: () => {
        const leadAsset = {
          caption: null,
          credits: null,
          crop169: null,
          id: "64806087-c6d0-4104-df61-1faf30525989",
          title: "Potholes"
        };
        expect(getCrop(leadAsset, "crop45")).toEqual(undefined);
      }
    },
    {
      name:
        "getCrop - return empty object if lead asset is a video but doesnt have a poster image of the right crop",
      test: () => {
        const leadAsset = {
          __typename: "Video",
          posterImage: {
            caption: null,
            credits: null,
            crop169: null,
            id: "64806087-c6d0-4104-df61-1faf30525989",
            title: "Potholes"
          }
        };
        expect(getCrop(leadAsset, "crop45")).toEqual(undefined);
      }
    }
  ];

  iterator(tests);
};
