import { addIndexesToInlineImages } from "../src/utils";

const content = [
  {
    name: "foo"
  },
  {
    attributes: {
      caption: "caption",
      credits: "credits",
      url: "image.com"
    },
    name: "image"
  },
  {
    name: "foo"
  },
  {
    attributes: {
      caption: "caption",
      posterImageUrl: "image.com",
      skySports: false
    },
    name: "video"
  }
];

const leadAsset = {
  type: "foo"
};

describe("addIndexesToInlineImages", () => {
  it("images and video in content, no leadAsset", () => {
    const output = addIndexesToInlineImages(content, undefined);
    expect(output.length).toEqual(4);
    expect(output[1].attributes.imageIndex).toEqual(0);
    expect(output[3].attributes.imageIndex).toEqual(1);
  });

  it("images and video in content and leadAsset", () => {
    const output = addIndexesToInlineImages(content, leadAsset);
    expect(output.length).toEqual(4);
    expect(output[1].attributes.imageIndex).toEqual(1);
    expect(output[3].attributes.imageIndex).toEqual(2);
  });

  it("leadAsset but no content", () => {
    expect(addIndexesToInlineImages(undefined, leadAsset)).toEqual([]);
  });

  it("no content or leadAsset", () => {
    expect(addIndexesToInlineImages(undefined, undefined)).toEqual([]);
  });
});
