const defaultCrop23 =
  "https://www.uat-thetimes.co.uk/imageserver/image/opiniontwo_2x3crop.jpg?crop=354%2C580%2C0%2C0";
const defaultCrop169 =
  "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fe42e32fe-d14c-11e7-b1ec-8503a5941b97.jpg?crop=6250%2C3516%2C0%2C326";
const defaultHeadline =
  "Nothing proves Jeremy Corbyn is anti-semitic — just everything he says and does";
const defaultShortHeadline = "Nothing proves Jeremy Corbyn is anti-semitic";
const defaultLabel = "opinion";
const defaultSection = "comment";
const defaultSlug =
  "bayeux-tapestry-now-for-a-new-battle-bringing-fragile-masterpiece-to-britain-safely";
const defaultShortIdentifier = "2k629tpvh";
const defaultSummary105 = [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over"
        },
        children: []
      }
    ]
  }
];
const defaultSummary125 = [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over defence cuts and"
        },
        children: []
      }
    ]
  }
];
const defaultSummary145 = [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over defence cuts and she should take it"
        },
        children: []
      }
    ]
  }
];
const defaultSummary160 = [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over defence cuts and she should take it seriously. Tobias"
        },
        children: []
      }
    ]
  }
];
const defaultSummary175 = [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over defence cuts and she should take it seriously. Tobias Ellwood, the"
        },
        children: []
      }
    ]
  }
];
const defaultSummary225 = [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over defence cuts and she should take it seriously. Tobias Ellwood, the veterans minister and a lieutenant-colonel in the"
        },
        children: []
      }
    ]
  }
];
const defaultTitle = "";
const defaultUrl =
  "https://www.uat-thetimes.co.uk/article/defence-of-the-realm-282pmmb7t";

export default (
  {
    crop23 = defaultCrop23,
    crop169 = defaultCrop169,
    headline = defaultHeadline,
    label = defaultLabel,
    section = defaultSection,
    slug = defaultSlug,
    shortIdentifier = defaultShortIdentifier,
    shortHeadline = defaultShortHeadline,
    summary105 = defaultSummary105,
    summary125 = defaultSummary125,
    summary145 = defaultSummary145,
    summary160 = defaultSummary160,
    summary175 = defaultSummary175,
    summary225 = defaultSummary225,
    title = defaultTitle,
    url = defaultUrl
  } = {}
) => ({
  data: {
    relatedArticleSlice: {
      sliceName: "OpinionOneAndTwoSlice",
      opinion: {
        article: {
          byline: [
            {
              name: "inline",
              attributes: {},
              children: [
                {
                  name: "text",
                  attributes: {
                    value: "Sathnam Sanghera"
                  },
                  children: []
                }
              ]
            }
          ],
          headline,
          id: "a88b0330-d14c-11e7-b1ec-8503a5941b97",
          slug,
          shortIdentifier,
          label,
          leadAsset: {
            title,
            crop169: {
              url: crop169
            },
            crop23: {
              url: crop23
            }
          },
          publicationName: "TIMES",
          publishedTime: "2015-03-13T18:54:58.000Z",
          section,
          shortHeadline,
          summary105,
          summary125,
          summary145,
          summary160,
          summary175,
          summary225,
          url
        }
      }
    }
  }
});
