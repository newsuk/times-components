const contentWithOutAd = [
  {
    name: "paragraph",
    children: []
  },
  {
    name: "paragraph",
    children: []
  },
  {
    name: "paywall",
    children: [
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "image",
        attributes: {
          display: "secondary",
          caption: null,
          credits: null,
          url:
            "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F82508792-f900-11ea-bed7-6729a62ebe0a.jpg?crop=1648%2C1648%2C582%2C535",
          ratio: "1000:1000",
          relativeHorizontalOffset: 0.19904240766073872,
          relativeVerticalOffset: 0.18278100444140757,
          relativeWidth: 0.5636114911080712,
          relativeHeight: 0.5630338230269901
        },
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "ad",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      }
    ]
  }
];

const contentWithAd = [
  {
    name: "paragraph",
    children: []
  },
  {
    name: "paragraph",
    children: []
  },
  {
    name: "paywall",
    children: [
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "image",
        attributes: {
          display: "secondary",
          caption: null,
          credits: null,
          url:
            "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F82508792-f900-11ea-bed7-6729a62ebe0a.jpg?crop=1648%2C1648%2C582%2C535",
          ratio: "1000:1000",
          relativeHorizontalOffset: 0.19904240766073872,
          relativeVerticalOffset: 0.18278100444140757,
          relativeWidth: 0.5636114911080712,
          relativeHeight: 0.5630338230269901
        },
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "ad",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "nativeAd",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      }
    ]
  }
];

const contentWithoutParagraphs = [
  {
    name: "paragraph",
    children: []
  },
  {
    name: "paragraph",
    children: []
  },
  {
    name: "paywall",
    children: [
      {
        name: "paragraph",
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "image",
        attributes: {
          display: "secondary",
          caption: null,
          credits: null,
          url:
            "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F82508792-f900-11ea-bed7-6729a62ebe0a.jpg?crop=1648%2C1648%2C582%2C535",
          ratio: "1000:1000",
          relativeHorizontalOffset: 0.19904240766073872,
          relativeVerticalOffset: 0.18278100444140757,
          relativeWidth: 0.5636114911080712,
          relativeHeight: 0.5630338230269901
        },
        children: []
      },
      {
        name: "paragraph",
        children: []
      },
      {
        name: "ad",
        children: []
      },
      {
        name: "paragraph",
        children: []
      }
    ]
  }
];

const contentIncludesPaywall = [
  {
    name: "paragraph",
    children: []
  },
  {
    name: "paragraph",
    children: []
  },
  {
    name: "nativeAd",
    children: []
  },
  {
    name: "paragraph",
    children: []
  }
];

export default {
  contentWithOutAd,
  contentWithAd,
  contentWithoutParagraphs,
  contentIncludesPaywall
};
