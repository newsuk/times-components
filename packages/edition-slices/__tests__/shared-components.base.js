import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import Image from "@times-components/image";
import { ArticleSummaryHeadline } from "@times-components/article-summary";
import { iterator } from "@times-components/test-utils";
import { mockEditionSlice } from "@times-components/fixture-generator";
import { TileH } from "../src/tiles";
import { getCrop, TileImage, TileLink, TileSummary } from "../src/tiles/shared";

jest.mock("@times-components/article-flag", () => ({
  ArticleFlags: "ArticleFlags"
}));

const tile = mockEditionSlice(1).items[0];

export default () => {
  const tests = [
    {
      name:
        "Tile summary falls back to shortHeadline if tileHeadline is unavailable",
      test: () => {
        const tileWithoutShortHeadline = {
          ...tile,
          article: {
            ...tile.article,
            shortHeadline: "This is shortheadline"
          },
          headline: ""
        };

        const output = TestRenderer.create(
          <TileSummary tile={tileWithoutShortHeadline} />
        );

        expect(
          output.root.findByType(ArticleSummaryHeadline).props.headline
        ).toEqual(tileWithoutShortHeadline.article.shortHeadline);
      }
    },
    {
      name:
        "Tile summary falls back to headline if shortHeadline and tileHeadline is unavailable",
      test: () => {
        const tileWithoutShortHeadlineAndTileHeadline = {
          ...tile,
          article: {
            ...tile.article,
            shortHeadline: ""
          },
          headline: ""
        };

        const output = TestRenderer.create(
          <TileSummary tile={tileWithoutShortHeadlineAndTileHeadline} />
        );

        expect(
          output.root.findByType(ArticleSummaryHeadline).props.headline
        ).toEqual(tileWithoutShortHeadlineAndTileHeadline.article.headline);
      }
    },
    {
      name:
        "Tile summary displays the tile summary override if it is available",
      test: () => {
        const tileWithTeaserOverride = {
          article: {
            ...tile.article
          },
          teaser125: [
            {
              children: [
                {
                  attributes: {
                    value: "This is summary 125 overriden"
                  },
                  children: [],
                  name: "text"
                }
              ],
              name: "paragraph"
            }
          ],
          ...tile
        };

        const output = TestRenderer.create(
          <TileH onPress={() => {}} tile={tileWithTeaserOverride} />
        );

        expect(output.root.findByType(TileSummary).props.summary).toEqual(
          tileWithTeaserOverride.teaser125
        );
      }
    },

    {
      name: "Tile summary displays tile leadAsset override if it is available",
      test: () => {
        const tileWithLeadAssetOverride = {
          article: {
            ...tile.article,
            listingAsset: {
              crop23: {
                ratio: "2:3",
                url:
                  "//www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fef809506-4b04-11e9-b472-f58a50a13bbb.jpg?crop=620%2C348%2C0%2C23"
              },
              id: "ef809506-4b04-11e9-b472-f58a50a13bbb"
            }
          },
          ...tile,
          leadAsset: {
            crop23: {
              ratio: "2:3",
              url:
                "//www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fef809506-4b04-11e9-b472-f58a50a13bbb.jpg?crop=620%2C348%2C0%2C23"
            },
            id: "ef809506-4b04-11e9-b472-f58a50a13bbb"
          }
        };

        const output = TestRenderer.create(
          <TileH onPress={() => {}} tile={tileWithLeadAssetOverride} />
        );

        expect(output.root.findByType(Image).props.uri).toEqual(
          tileWithLeadAssetOverride.leadAsset.crop23.url
        );
      }
    },
    {
      name:
        "Tile summary displays tile listingAsset override if no tile override is available",
      test: () => {
        const tileWithListingAssetOverride = {
          ...tile,
          article: {
            ...tile.article,
            listingAsset: {
              crop23: {
                ratio: "2:3",
                url:
                  "//www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fwf809506-4b04-11e9-b472-f58a50a13bbb.jpg?crop=620%2C348%2C0%2C23"
              },
              id: "wf809506-4b04-11e9-b472-f58a50a13bbb"
            }
          },
          leadAsset: null
        };

        const output = TestRenderer.create(
          <TileH onPress={() => {}} tile={tileWithListingAssetOverride} />
        );

        expect(output.root.findByType(TileImage).props.uri).toEqual(
          tileWithListingAssetOverride.article.listingAsset.crop23.url
        );
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
