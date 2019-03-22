import { getMediaList } from "../src/utils";

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

const videoLeadAsset = {
  brightcoveAccountId: "5436121856001",
  brightcovePlayerId: "default",
  brightcovePolicyKey: "foo",
  brightcoveVideoId: "6018770071001",
  paidOnly: false,
  posterImage: {
    caption: null,
    credits: null,
    crop169: {
      url: "image.com"
    },
    id: "72f59afd-7c91-4e0b-a1d2-9ce0eae63e75",
    title: ""
  },
  skySports: false,
  type: "Video"
};

const imageLeadAsset = {
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
        }
      },
      {
        index: 1,
        name: "inlineImage",
        value: {
          caption: "caption",
          credits: "PA",
          display: "primary",
          ratio: "1500:1000",
          url: "image.com"
        }
      },
      {
        index: 2,
        name: "inlineVideo",
        value: {
          caption: "Scores killed after gunman opens fire",
          display: "primary",
          posterImageUrl: "image.com",
          skySports: false
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
          brightcoveAccountId: "5436121856001",
          brightcovePlayerId: "default",
          brightcovePolicyKey: "foo",
          brightcoveVideoId: "6018770071001",
          paidOnly: false,
          posterImage: {
            caption: null,
            credits: null,
            crop169: {
              url: "image.com"
            },
            id: "72f59afd-7c91-4e0b-a1d2-9ce0eae63e75",
            title: ""
          },
          skySports: false,
          type: "Video"
        }
      },
      {
        index: 1,
        name: "inlineImage",
        value: {
          caption: "caption",
          credits: "PA",
          display: "primary",
          ratio: "1500:1000",
          url: "image.com"
        }
      },
      {
        index: 2,
        name: "inlineVideo",
        value: {
          caption: "Scores killed after gunman opens fire",
          display: "primary",
          posterImageUrl: "image.com",
          skySports: false
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
          display: "primary",
          ratio: "1500:1000",
          url: "image.com"
        }
      },
      {
        index: 1,
        name: "inlineVideo",
        value: {
          caption: "Scores killed after gunman opens fire",
          display: "primary",
          posterImageUrl: "image.com",
          skySports: false
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
          brightcoveAccountId: "5436121856001",
          brightcovePlayerId: "default",
          brightcovePolicyKey: "foo",
          brightcoveVideoId: "6018770071001",
          paidOnly: false,
          posterImage: {
            caption: null,
            credits: null,
            crop169: {
              url: "image.com"
            },
            id: "72f59afd-7c91-4e0b-a1d2-9ce0eae63e75",
            title: ""
          },
          skySports: false,
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
          brightcoveAccountId: "5436121856001",
          brightcovePlayerId: "default",
          brightcovePolicyKey: "foo",
          brightcoveVideoId: "6018770071001",
          paidOnly: false,
          posterImage: {
            caption: null,
            credits: null,
            crop169: {
              url: "image.com"
            },
            id: "72f59afd-7c91-4e0b-a1d2-9ce0eae63e75",
            title: ""
          },
          skySports: false,
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
