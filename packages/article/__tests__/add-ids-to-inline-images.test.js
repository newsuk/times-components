import { addIdsToInlineImages } from "../src/utils";

const content = [
  {
    children: [
      {
        attributes: {
          value: "text"
        },
        name: "text"
      }
    ],
    name: "paragraph"
  },
  {
    attributes: {
      caption: "caption",
      credits: "PA",
      display: "primary",
      ratio: "1500:1000",
      url: "image.com"
    },
    name: "image"
  },
  {
    children: [
      {
        attributes: {
          value: "more text"
        },
        name: "text"
      }
    ],
    name: "paragraph"
  },
  {
    attributes: {
      brightcoveAccountId: "5436121856001",
      brightcovePlayerId: "default",
      brightcovePolicyKey: "foo",
      brightcoveVideoId: "6014234295001",
      caption: "Scores killed after gunman opens fire",
      display: "primary",
      paidOnly: false,
      posterImageUrl: "image.com",
      skySports: false
    },
    name: "video"
  }
];

const leadAsset = {
  caption: null,
  credits: "image credits",
  crop11: null,
  crop23: null,
  crop32: null,
  crop45: null,
  crop169: {
    url: "image.com"
  },
  crop1251: null,
  id: "2e7670f9-e035-48ba-aa69-f4bbbae7df30",
  title: "Geraint Thomas",
  type: "Image"
};

describe("addIdsToInlineImages", () => {
  it("images and video in content, no leadAsset", () => {
    const output = addIdsToInlineImages(content, undefined);
    expect(output.length).toEqual(4);
    expect(output[1].attributes.imageIndex).toEqual(0);
    expect(output[3].attributes.imageIndex).toEqual(1);
  });

  it("images and video in content and leadAsset", () => {
    const output = addIdsToInlineImages(content, leadAsset);
    expect(output.length).toEqual(4);
    expect(output[1].attributes.imageIndex).toEqual(1);
    expect(output[3].attributes.imageIndex).toEqual(2);
  });

  it("leadAsset but no content", () => {
    expect(addIdsToInlineImages(undefined, leadAsset)).toEqual([]);
  });

  it("no content or leadAsset", () => {
    expect(addIdsToInlineImages(undefined, undefined)).toEqual([]);
  });
});
