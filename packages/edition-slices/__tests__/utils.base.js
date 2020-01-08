import { mockEditionSlice } from "@times-components/fixture-generator";
import {
  getTileImage,
  getTileSummary,
  getTileStrapline
} from "../src/tiles/shared";

const tile = mockEditionSlice(1).items[0];

jest.mock("@times-components/image", () => "TimesImage");

export default () => {
  describe("getTileImage should", () => {
    test("getTileImage - return null if there is no lead asset", () => {
      const tileWithoutLeadAsset = {
        ...tile,
        article: {
          ...tile.article,
          leadAsset: null,
          listingAsset: null
        },
        leadAsset: null
      };
      expect(getTileImage(tileWithoutLeadAsset, "crop169")).toEqual(null);
    });
    test("getTileImage - return poster image crop if lead asset is a video", () => {
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
      const tileWithLeadAsset = {
        ...tile,
        article: {
          ...tile.article,
          leadAsset,
          listingAsset: leadAsset
        },
        leadAsset
      };
      expect(getTileImage(tileWithLeadAsset, "crop169")).toEqual(
        leadAsset.posterImage.crop169
      );
    });
    test("getTileImage - return undefined if lead asset doesnt have the right crop", () => {
      const leadAsset = {
        caption: null,
        credits: null,
        crop169: null,
        id: "64806087-c6d0-4104-df61-1faf30525989",
        title: "Potholes"
      };
      const tileWithLeadAsset = {
        ...tile,
        article: {
          ...tile.leadAsset,
          leadAsset,
          listingAsset: leadAsset
        },
        leadAsset
      };
      expect(getTileImage(tileWithLeadAsset, "crop45")).toEqual({});
    });
    test("getTileImage - return empty object if lead asset is a video but doesnt have a poster image of the right crop", () => {
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
      const tileWithLeadAsset = {
        ...tile,
        article: {
          ...tile.leadAsset,
          leadAsset,
          listingAsset: leadAsset
        },
        leadAsset
      };
      expect(getTileImage(tileWithLeadAsset, "crop45")).toEqual({});
    });
  });

  describe("getTileSummary should", () => {
    test("getTileSummary should return ast for summary with 125 characters", () => {
      const length = 125;
      const summary125 = [
        {
          attributes: {},
          children: [
            {
              attributes: {
                value:
                  "Theresa May has two objectives tomorrow when MPs get to vote on Brexit — the trouble is both are fraught with difficulty."
              },
              children: [],
              name: "text"
            }
          ],
          name: "paragraph"
        }
      ];
      const tileWithSummary125 = {
        ...tile,
        article: {
          ...tile.article,
          summary125
        }
      };
      expect(getTileSummary(tileWithSummary125, length)).toEqual(summary125);
    });
    test("getTileSummary should return ast for summary with 300 characters", () => {
      const length = 300;
      const summary300 = [
        {
          attributes: {},
          children: [
            {
              attributes: {
                value:
                  "‘The prodigal son returns.” So read a banner tied to the wall of the Paul Strank Stand at Kingsmeadow, the home of AFC Wimbledon, on Saturday, alongside the sepia-toned image of a fresh-faced Wally Downes, sporting an 80s haircut and Wimbledon strip, with a mischievous glint in his eye."
              },
              children: [],
              name: "text"
            }
          ],
          name: "paragraph"
        }
      ];
      const tileWithSummary300 = {
        ...tile,
        article: {
          ...tile.article,
          summary300
        }
      };
      expect(getTileSummary(tileWithSummary300, length)).toEqual(summary300);
    });
  });

  describe("getTileStrapline should", () => {
    test("getTileStrapline should return strapline", () => {
      expect(getTileStrapline(tile)).toBe(tile.strapline);
    });
  });
};
