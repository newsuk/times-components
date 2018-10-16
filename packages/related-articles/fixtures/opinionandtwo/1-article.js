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
    attributes: {},
    children: [
      {
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over"
        },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  }
];
const defaultSummary125 = [
  {
    attributes: {},
    children: [
      {
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over defence cuts and"
        },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  }
];
const defaultSummary145 = [
  {
    attributes: {},
    children: [
      {
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over defence cuts and she should take it"
        },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  }
];
const defaultSummary160 = [
  {
    attributes: {},
    children: [
      {
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over defence cuts and she should take it seriously. Tobias"
        },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  }
];
const defaultSummary175 = [
  {
    attributes: {},
    children: [
      {
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over defence cuts and she should take it seriously. Tobias Ellwood, the"
        },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  }
];
const defaultSummary225 = [
  {
    attributes: {},
    children: [
      {
        attributes: {
          value:
            "The prime minister may feel that she has no time for more mutinies by her own MPs, but she faces one over defence cuts and she should take it seriously. Tobias Ellwood, the veterans minister and a lieutenant-colonel in the"
        },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
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
      opinion: {
        article: {
          byline: [
            {
              attributes: {},
              children: [
                {
                  attributes: {
                    value: "Sathnam Sanghera"
                  },
                  children: [],
                  name: "text"
                }
              ],
              name: "inline"
            }
          ],
          headline,
          id: "a88b0330-d14c-11e7-b1ec-8503a5941b97",
          slug,
          shortIdentifier,
          label,
          leadAsset: {
            crop23: {
              url: crop23
            },
            crop169: {
              url: crop169
            },
            title
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
      },
      sliceName: "OpinionOneAndTwoSlice"
    }
  }
});
