const defaultCrop169 =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0547a7be-fb77-11e7-a987-7fcf5e9983dc.jpg?crop=2000%2C1125%2C0%2C104";
const defaultHeadline =
  "Now for a new battle: bringing the fragile masterpiece over safely";
const defaultSummary105 = [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab"
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
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab it for Nazi Germany"
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
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab it for Nazi Germany and Britain failed"
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
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab it for Nazi Germany and Britain failed to borrow it to"
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
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab it for Nazi Germany and Britain failed to borrow it to celebrate the"
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
            "Napoleon Bonaparte flaunted it to whip up enthusiasm for invading England. Heinrich Himmler tried to grab it for Nazi Germany and Britain failed to borrow it to celebrate the Coronation in 1953. Now the Bayeux Tapestry, the"
        },
        children: []
      }
    ]
  }
];

const defaultTitle =
  "The tapestry has had a purpose-built home since 1983, having once been kept at Bayeux Cathedral";
const defaultUrl =
  "https://www.thetimes.co.uk/article/bayeux-tapestry-now-for-a-new-battle-bringing-fragile-masterpiece-to-britain-safely-2k629tpvh";

export default (
  {
    crop169 = defaultCrop169,
    headline = defaultHeadline,
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
    relatedArticlesLayout: {
      template: "DEFAULT"
    },
    relatedArticles: [
      {
        id: "48604618-fb0e-11e7-a987-7fcf5e9983dc",
        headline,
        section: "thedish",
        summary105,
        summary125,
        summary145,
        summary160,
        summary175,
        summary225,
        publicationName: "TIMES",
        publishedTime: "2015-03-13T18:54:58.000Z",
        label: "BAYEUX TAPESTRY",
        url,
        byline: [
          {
            name: "author",
            attributes: {
              slug: "camilla-long"
            },
            children: [
              {
                name: "text",
                attributes: {
                  value: "Camilla Long"
                },
                children: []
              }
            ]
          },
          {
            name: "inline",
            attributes: {},
            children: [
              {
                name: "text",
                attributes: {
                  value: ", Environment Editor"
                },
                children: []
              }
            ]
          }
        ],
        leadAsset: {
          title,
          crop169: {
            url: crop169
          }
        }
      }
    ]
  }
});
