import {fixtures} from "@times-components/provider-test-tools";

const createArticle = () => ({
  hasVideo: false,
  byline: [],
  headline: `Patisserie calls in turnaround king after chief executive quits`,
  id: `97c64f20-cb67-11e4-a202-50ac5def393a`,
  label: "EXAMPLE LABEL",
  leadAsset: {
    id: "34d64f20-cb67-11e4-a202-50ac5def393a",
    crop: {
      url:
        "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F93ca91ce-e071-11e8-9ca5-2dc8c6b25903.jpg?crop=2592%2C1728%2C204%2C100"
    }
  },
  publishedTime: new Date(0),
  shortHeadline: `Stopped on the way to join Isis`,
  shortIdentifier: `57nwljmbn`,
  slug: `british-trio-stopped-on-the-way-to-join-isis`,
  summary: [
    {
      "name": "paragraph",
      "children": [
        {
          "name": "text",
          "attributes": {
            "value": "In 2004, when I met Michael Bublé for the first time, he was an unknown 28-year-old launching himself as a jazzy"
          },
          "children": []
        }
      ]
    }
  ],
  url: "/article/british-trio-stopped-on-the-way-to-join-isis-57nwljmbn" // TODO localhost should be an env variable.
});

const createArticles = pageArtCount =>
  new Array(pageArtCount).fill(0).map(() => createArticle());

const createBiography = () => [
  {
    attributes: {
      value: "Deborah Haynes is the defence editor at "
    },
    children: [],
    name: "text"
  },
  {
    attributes: {},
    children: [
      {
        attributes: {
          value: "The Times"
        },
        children: [],
        name: "text"
      }
    ],
    name: "italic"
  },
  {
    attributes: {
      value:
        ", covering the most important defence & security news in the UK and around the world."
    },
    children: [],
    name: "text"
  }
];

const description = () => [
  {
    attributes: {
      value: "Chelsea is known for its "
    },
    children: [],
    name: "text"
  },
  {
    attributes: {},
    children: [
      {
        attributes: {
          value: "affluent"
        },
        children: [],
        name: "text"
      }
    ],
    name: "italic"
  },
  {
    attributes: {
      value:
        " residents and the posh shops and restaurants that cater to them. It’s a cultural haven too, with the Royal Court Theatre on Sloane Square and the modern Saatchi Gallery on the Duke of York Square. Close by, busy King’s Road is lined with mid- to high-end stores."
    },
    children: [],
    name: "text"
  }
];

const byline = () => [
  {
    name: "author",
    "attributes": {
      "slug": "will-hodgkinson"
    },
    "children": [
      {
        "name": "text",
        "attributes": {
          "value": "Will Hodgkinson"
        },
        "children": []
      }
    ]
  }
]
const totalArticleCount = 22;
const pageArtCount = 20;

const id = "97c64f20-cb67-11e4-a202-50ac5def393a";

const artFixtures = fixtures.articleFixtures;

export default function(makeArticle = x => x) {
  return {
    types: {
      Media: () => ({
        __typename: "Image"
      }),
      Slug: () => "fiona-hamilton"
    },
    values: {
      author: () => ({
        __typename: "Author",
        articles: {
          __typename: "Articles",
          count: totalArticleCount,
          list: createArticles(pageArtCount)
        },
        biography: createBiography(),
        hasLeadAssets: false,
        image: "//www.thetimes.co.uk/d/img/profile/greg-hurst.jpg",
        jobTitle: "Legal Editor",
        name: "Fiona Hamilton",
        slug: "fiona-hamilton",
        twitter: "jdoe"
      }),
      topic: () => ({
        __typename: "Topic",
        articles: {
          __typename: "Articles",
          count: totalArticleCount,
          list: createArticles(pageArtCount)
        },
        byline,
        name: "Canada",
        description: description
      })
    }
  };
}
