import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import Image from "@times-components/image";
import { SectionContext } from "@times-components/context";
import { ArticleSummaryHeadline } from "@times-components/article-summary";
import { iterator } from "@times-components/test-utils";
import { mockEditionSlice } from "@times-components/fixture-generator";
import StarButton from "@times-components/star-button";
import { ResponsiveContext } from "@times-components/responsive";
import { editionBreakpoints } from "@times-components/styleguide";
import { TileH, TileX } from "../src/tiles";
import { TileLink, TileStar, TileSummary } from "../src/tiles/shared";
import { ResponsiveSlice } from "../src/slices/shared";

jest.mock("@times-components/article-flag", () => ({
  ArticleFlags: "ArticleFlags"
}));

const tile = mockEditionSlice(1).items[0];

export default () => {
  const tests = [
    {
      name:
        "Tile summary falls back to article strapline if strapline is unavailable",
      test: () => {
        const tileWithoutStrapline = {
          ...tile,
          article: {
            ...tile.article,
            strapline: "This is strapline"
          },
          strapline: ""
        };

        const output = TestRenderer.create(
          <TileX onPress={() => {}} tile={tileWithoutStrapline} />
        );

        expect(output.root.findByType(TileSummary).props.strapline).toEqual(
          tileWithoutStrapline.article.strapline
        );
      }
    },
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

        expect(output.root.findByType(Image).props.uri).toEqual(
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
      name: "Tile Star is rendered as already saved in default light theme",
      test: () => {
        const onArticleSavePress = jest.fn();
        const savedArticles = { "1": true };

        const output = TestRenderer.create(
          <SectionContext.Provider
            value={{
              onArticleSavePress,
              savedArticles
            }}
          >
            <TileStar articleId="1" />
          </SectionContext.Provider>
        );

        expect(output.root.findByType(StarButton).props.selected).toEqual(true);
        expect(output.root.findByType(StarButton).props.isDark).toEqual(false);
      }
    },
    {
      name: "Tile Star is rendered as already saved in dark theme",
      test: () => {
        const onArticleSavePress = jest.fn();
        const savedArticles = { "1": true };

        const output = TestRenderer.create(
          <SectionContext.Provider
            value={{
              onArticleSavePress,
              savedArticles
            }}
          >
            <TileStar articleId="1" isDark />
          </SectionContext.Provider>
        );

        expect(output.root.findByType(StarButton).props.isDark).toEqual(true);
      }
    },
    {
      name: "Tile Star is rendered as not yet saved in default light theme",
      test: () => {
        const onArticleSavePress = jest.fn();
        const savedArticles = { "1": true };

        const output = TestRenderer.create(
          <SectionContext.Provider
            value={{
              onArticleSavePress,
              savedArticles
            }}
          >
            <TileStar articleId="I am not saved yet" />
          </SectionContext.Provider>
        );

        expect(output.root.findByType(StarButton).props.selected).toEqual(
          false
        );
        expect(output.root.findByType(StarButton).props.isDark).toEqual(false);
      }
    },
    {
      name: "Tile Star is rendered as not yet saved in dark theme",
      test: () => {
        const onArticleSavePress = jest.fn();
        const savedArticles = { "1": true };

        const output = TestRenderer.create(
          <SectionContext.Provider
            value={{
              onArticleSavePress,
              savedArticles
            }}
          >
            <TileStar articleId="I am not saved yet" isDark />
          </SectionContext.Provider>
        );

        expect(output.root.findByType(StarButton).props.isDark).toEqual(true);
      }
    },
    {
      name: "Tile Star is disabled in default light theme",
      test: () => {
        const onArticleSavePress = jest.fn();
        const savedArticles = null;

        const output = TestRenderer.create(
          <SectionContext.Provider
            value={{
              onArticleSavePress,
              savedArticles
            }}
          >
            <TileStar articleId="1" />
          </SectionContext.Provider>
        );

        expect(output.root.findByType(StarButton).props.disabled).toEqual(true);
        expect(output.root.findByType(StarButton).props.isDark).toEqual(false);
      }
    },
    {
      name: "Tile Star is disabled in dark theme",
      test: () => {
        const onArticleSavePress = jest.fn();
        const savedArticles = null;

        const output = TestRenderer.create(
          <SectionContext.Provider
            value={{
              onArticleSavePress,
              savedArticles
            }}
          >
            <TileStar articleId="1" isDark />
          </SectionContext.Provider>
        );

        expect(output.root.findByType(StarButton).props.isDark).toEqual(true);
      }
    },
    {
      name: "Responsive Slice renders small layout if no breakpoint",
      test: () => {
        const renderSmallMock = jest.fn();
        const renderMediumMock = jest.fn();
        const renderWideMock = jest.fn();
        const renderHugeMock = jest.fn();

        TestRenderer.create(
          <ResponsiveContext.Provider value={{}}>
            <ResponsiveSlice
              renderSmall={renderSmallMock}
              renderMedium={renderMediumMock}
              renderWide={renderWideMock}
              renderHuge={renderHugeMock}
            />
          </ResponsiveContext.Provider>
        );

        expect(renderSmallMock).toHaveBeenCalled();
      }
    },
    {
      name: "Responsive Slice renders huge layout when in huge breakpoint",
      test: () => {
        const renderSmallMock = jest.fn();
        const renderMediumMock = jest.fn();
        const renderWideMock = jest.fn();
        const renderHugeMock = jest.fn();

        TestRenderer.create(
          <ResponsiveContext.Provider
            value={{ editionBreakpoint: editionBreakpoints.huge }}
          >
            <ResponsiveSlice
              renderSmall={renderSmallMock}
              renderMedium={renderMediumMock}
              renderWide={renderWideMock}
              renderHuge={renderHugeMock}
            />
          </ResponsiveContext.Provider>
        );

        expect(renderHugeMock).toHaveBeenCalled();
      }
    },
    {
      name:
        "Responsive Slice fallbacks to wide layout when in huge breakpoint but renderHuge method is undefined",
      test: () => {
        const renderSmallMock = jest.fn();
        const renderMediumMock = jest.fn();
        const renderWideMock = jest.fn();

        TestRenderer.create(
          <ResponsiveContext.Provider
            value={{ editionBreakpoint: editionBreakpoints.huge }}
          >
            <ResponsiveSlice
              renderSmall={renderSmallMock}
              renderMedium={renderMediumMock}
              renderWide={renderWideMock}
            />
          </ResponsiveContext.Provider>
        );

        expect(renderWideMock).toHaveBeenCalled();
      }
    },
    {
      name:
        "Responsive Slice fallbacks to medium layout when in huge breakpoint but renderHuge and renderWide methods are undefined",
      test: () => {
        const renderSmallMock = jest.fn();
        const renderMediumMock = jest.fn();

        TestRenderer.create(
          <ResponsiveContext.Provider
            value={{ editionBreakpoint: editionBreakpoints.huge }}
          >
            <ResponsiveSlice
              renderSmall={renderSmallMock}
              renderMedium={renderMediumMock}
            />
          </ResponsiveContext.Provider>
        );

        expect(renderMediumMock).toHaveBeenCalled();
      }
    },
    {
      name: "Responsive Slice renders wide layout when in wide breakpoint",
      test: () => {
        const renderSmallMock = jest.fn();
        const renderMediumMock = jest.fn();
        const renderWideMock = jest.fn();
        const renderHugeMock = jest.fn();

        TestRenderer.create(
          <ResponsiveContext.Provider
            value={{ editionBreakpoint: editionBreakpoints.wide }}
          >
            <ResponsiveSlice
              renderSmall={renderSmallMock}
              renderMedium={renderMediumMock}
              renderWide={renderWideMock}
              renderHuge={renderHugeMock}
            />
          </ResponsiveContext.Provider>
        );

        expect(renderWideMock).toHaveBeenCalled();
      }
    },
    {
      name:
        "Responsive Slice fallbacks to medium layout when in wide breakpoint but renderWide method is undefined",
      test: () => {
        const renderSmallMock = jest.fn();
        const renderMediumMock = jest.fn();

        TestRenderer.create(
          <ResponsiveContext.Provider
            value={{ editionBreakpoint: editionBreakpoints.wide }}
          >
            <ResponsiveSlice
              renderSmall={renderSmallMock}
              renderMedium={renderMediumMock}
            />
          </ResponsiveContext.Provider>
        );

        expect(renderMediumMock).toHaveBeenCalled();
      }
    },
    {
      name: "Responsive Slice renders medium layout when in medium breakpoint",
      test: () => {
        const renderSmallMock = jest.fn();
        const renderMediumMock = jest.fn();
        const renderWideMock = jest.fn();
        const renderHugeMock = jest.fn();

        TestRenderer.create(
          <ResponsiveContext.Provider
            value={{ editionBreakpoint: editionBreakpoints.medium }}
          >
            <ResponsiveSlice
              renderSmall={renderSmallMock}
              renderMedium={renderMediumMock}
              renderWide={renderWideMock}
              renderHuge={renderHugeMock}
            />
          </ResponsiveContext.Provider>
        );

        expect(renderMediumMock).toHaveBeenCalled();
      }
    },
    {
      name: "Responsive Slice renders small layout when in small breakpoint",
      test: () => {
        const renderSmallMock = jest.fn();
        const renderMediumMock = jest.fn();
        const renderWideMock = jest.fn();
        const renderHugeMock = jest.fn();

        TestRenderer.create(
          <ResponsiveContext.Provider
            value={{ editionBreakpoint: editionBreakpoints.small }}
          >
            <ResponsiveSlice
              renderSmall={renderSmallMock}
              renderMedium={renderMediumMock}
              renderWide={renderWideMock}
              renderHuge={renderHugeMock}
            />
          </ResponsiveContext.Provider>
        );

        expect(renderSmallMock).toHaveBeenCalled();
      }
    }
  ];

  iterator(tests);
};
