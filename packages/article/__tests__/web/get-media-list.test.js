import { getMediaList } from "../../src/utils";

const content = [
  {
    name: "foo"
  },
  {
    attributes: {
      caption: "caption",
      credits: "PA",
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
      posterImageUrl: "image.com"
    },
    name: "video"
  }
];

const videoLeadAsset = {
  posterImage: {
    caption: null,
    credits: null,
    crop169: {
      url: "image.com"
    },
    title: ""
  },
  type: "Video"
};

const imageLeadAsset = {
  caption: null,
  credits: "image credits",
  crop169: {
    url: "image.com"
  },
  title: "image title",
  type: "Image"
};

describe("getMediaList", () => {
  it("images and video in content, image as leadAsset", () => {
    const output = getMediaList(content, imageLeadAsset);
    const expectedOutput = [
      {
        index: 0,
        name: "leadAsset",
        value: {
          caption: null,
          credits: "image credits",
          crop169: {
            url: "image.com"
          },
          title: "image title",
          type: "Image"
        }
      },
      {
        index: 1,
        name: "inlineImage",
        value: {
          caption: "caption",
          credits: "PA",
          url: "image.com"
        }
      },
      {
        index: 2,
        name: "inlineVideo",
        value: {
          caption: "caption",
          posterImageUrl: "image.com"
        }
      }
    ];
    expect(output.length).toEqual(3);
    expect(output[0].index).toEqual(0);
    expect(output).toEqual(expectedOutput);
  });

  it("images and video in content, video as leadAsset", () => {
    const output = getMediaList(content, videoLeadAsset);
    const expectedOutput = [
      {
        index: 0,
        name: "leadAsset",
        value: {
          posterImage: {
            caption: null,
            credits: null,
            crop169: {
              url: "image.com"
            },
            title: ""
          },
          type: "Video"
        }
      },
      {
        index: 1,
        name: "inlineImage",
        value: {
          caption: "caption",
          credits: "PA",
          url: "image.com"
        }
      },
      {
        index: 2,
        name: "inlineVideo",
        value: {
          caption: "caption",
          posterImageUrl: "image.com"
        }
      }
    ];

    expect(output.length).toEqual(3);
    expect(output[0].index).toEqual(0);
    expect(output).toEqual(expectedOutput);
  });

  it("images and video in content, no leadAsset", () => {
    const output = getMediaList(content, undefined);
    const expectedOutput = [
      {
        index: 0,
        name: "inlineImage",
        value: {
          caption: "caption",
          credits: "PA",
          url: "image.com"
        }
      },
      {
        index: 1,
        name: "inlineVideo",
        value: {
          caption: "caption",
          posterImageUrl: "image.com"
        }
      }
    ];

    expect(output.length).toEqual(2);
    expect(output[0].index).toEqual(0);
    expect(output).toEqual(expectedOutput);
  });

  it("video as leadAsset no content", () => {
    const output = getMediaList(undefined, videoLeadAsset);
    const expectedOutput = [
      {
        index: 0,
        name: "leadAsset",
        value: {
          posterImage: {
            caption: null,
            credits: null,
            crop169: {
              url: "image.com"
            },
            title: ""
          },
          type: "Video"
        }
      }
    ];

    expect(output.length).toEqual(1);
    expect(output[0].index).toEqual(0);
    expect(output).toEqual(expectedOutput);
  });

  it("image as leadAsset no content", () => {
    const output = getMediaList(undefined, videoLeadAsset);
    const expectedOutput = [
      {
        index: 0,
        name: "leadAsset",
        value: {
          posterImage: {
            caption: null,
            credits: null,
            crop169: {
              url: "image.com"
            },
            title: ""
          },
          type: "Video"
        }
      }
    ];

    expect(output.length).toEqual(1);
    expect(output[0].index).toEqual(0);
    expect(output).toEqual(expectedOutput);
  });

  it("no content or leadAsset", () => {
    expect(getMediaList(undefined, undefined)).toEqual([]);
  });
});
