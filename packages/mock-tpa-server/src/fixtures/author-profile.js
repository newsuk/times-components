const createArticle = (index) => ({
    headline: `British Trio Stopped on the way to join Isis`,
    shortHeadline: `Stopped on the way to join Isis`,
    label: 'EXAMPLE LABEL',
    id: `97c64f20-cb67-11e4-a202-50ac5def393a`,
    shortIdentifier: `57nwljmbn`,
    hasVideo: false,
    slug: `british-trio-stopped-on-the-way-to-join-isis`,
    url: 'http://localhost:4000/article/british-trio-stopped-on-the-way-to-join-isis-57nwljmbn', //TODO localhost should be an env variable.
    summary: [],
    publishedTime: new Date(0),
    leadAsset: {
      crop: {
          url: 'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F93ca91ce-e071-11e8-9ca5-2dc8c6b25903.jpg?crop=2592%2C1728%2C204%2C100'
      }
    }
  })
  
  const createArticles = (count) => new Array(count).fill(0).map((item, index) =>
    createArticle(index));
  
  const createBiography = () => [{
      attributes: {
        value: "Deborah Haynes is the defence editor at "
      },
      children: [],
      name: "text"
    },
    {
      attributes: {},
      children: [{
        attributes: {
          value: "The Times"
        },
        children: [],
        name: "text"
      }],
      name: "italic"
    },
    {
      attributes: {
        value: ", covering the most important defence & security news in the UK and around the world."
      },
      children: [],
      name: "text"
    }
  ];
  
  const articleCount = 22;
  
  export default function () {
    return {
      types: {
        Media: () => ({
          __typename: "Image"
        })
      },
      values: {
        author: (_, authorRequestParams, __, gqlQuery, data) => {
          return {
            __typename: "Author",
            articles: {
              __typename: "Articles",
              count: articleCount,
              list: createArticles(articleCount),
            },
            biography: createBiography(),
            hasLeadAssets: false,
            image: "//www.thetimes.co.uk/d/img/profile/greg-hurst.jpg",
            jobTitle: "Legal Editor",
            name: "Fiona Hamilton",
            twitter: "jdoe",
            slug: 'fiona-hamilton',
          };
        }
      }
    }
  }
  