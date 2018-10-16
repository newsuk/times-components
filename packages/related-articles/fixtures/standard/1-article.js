const defaultCrop169 =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0547a7be-fb77-11e7-a987-7fcf5e9983dc.jpg?crop=2000%2C1125%2C0%2C104";
const defaultHasVideo = false;
const defaultHeadline =
  "Now for a new battle: bringing the fragile masterpiece over safely";
const defaultShortHeadline = "Bringing the fragile masterpiece over safely";
const defaultLabel = "BAYEUX TAPESTRY";
const defaultSection = "thedish";
const defaultSummary105 = [
  {
    attributes: {},
    children: [
      {
        attributes: {
          value:
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab"
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
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab it for Nazi Germany"
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
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab it for Nazi Germany and Britain failed"
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
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab it for Nazi Germany and Britain failed to borrow it to"
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
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab it for Nazi Germany and Britain failed to borrow it to celebrate the"
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
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab it for Nazi Germany and Britain failed to borrow it to celebrate the Coronation in 1953. Now the Bayeux Tapestry, the"
        },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  }
];

const defaultTitle =
  "The tapestry has had a purpose-built home since 1983, having once been kept at Bayeux Cathedral";
const defaultUrl =
  "https://www.thetimes.co.uk/article/bayeux-tapestry-now-for-a-new-battle-bringing-fragile-masterpiece-to-britain-safely-2k629tpvh";

export default (
  {
    crop169 = defaultCrop169,
    hasVideo = defaultHasVideo,
    headline = defaultHeadline,
    label = defaultLabel,
    section = defaultSection,
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
      items: [
        {
          article: {
            byline: [
              {
                attributes: {
                  slug: "camilla-long"
                },
                children: [
                  {
                    attributes: {
                      value: "Camilla Long"
                    },
                    children: [],
                    name: "text"
                  }
                ],
                name: "author"
              },
              {
                attributes: {},
                children: [
                  {
                    attributes: {
                      value: ", Environment Editor"
                    },
                    children: [],
                    name: "text"
                  }
                ],
                name: "inline"
              }
            ],
            hasVideo,
            headline,
            id: "48604618-fb0e-11e7-a987-7fcf5e9983dc",
            label,
            leadAsset: {
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
        }
      ],
      sliceName: "StandardSlice"
    }
  }
});
