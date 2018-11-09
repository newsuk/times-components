const createArticle = () => ({
  hasVideo: false,
  headline: `British Trio Stopped on the way to join Isis`,
  id: `97c64f20-cb67-11e4-a202-50ac5def393a`,
  label: "EXAMPLE LABEL",
  leadAsset: {
    crop: {
      url:
        "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F93ca91ce-e071-11e8-9ca5-2dc8c6b25903.jpg?crop=2592%2C1728%2C204%2C100"
    }
  },
  publishedTime: new Date(0),
  shortHeadline: `Stopped on the way to join Isis`,
  shortIdentifier: `57nwljmbn`,
  slug: `british-trio-stopped-on-the-way-to-join-isis`,
  summary: [],
  url: "/article/british-trio-stopped-on-the-way-to-join-isis-57nwljmbn" // TODO localhost should be an env variable.
});

const createArticles = count =>
  new Array(count).fill(0).map(() => createArticle());

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

const articleCount = 22;

export default function() {
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
          count: articleCount,
          list: createArticles(articleCount)
        },
        biography: createBiography(),
        hasLeadAssets: false,
        image: "//www.thetimes.co.uk/d/img/profile/greg-hurst.jpg",
        jobTitle: "Legal Editor",
        name: "Fiona Hamilton",
        slug: "fiona-hamilton",
        twitter: "jdoe"
      })
    }
  };
}
