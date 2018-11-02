const createArticle = () => ({
  headline: 'WWWOOOOOOOO',
  id: 'article-id',
  url: 'I am a url',
  summary: [],
  publishedTime: new Date(),
  leadAsset: {
    posterImage: {
      crop: {
        url: 'I am a url'
      }
    },
    crop: {
      url: 'I am a url'
    }
  }
})

const createArticles = (count) => new Array(count).fill(0).map(item =>
  createArticle());

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
        console.log('authorRequestParams: ');
        console.log(gqlQuery);
        console.log('\n');
        return {
          __typename: "Author",
          articles: {
            __typename: "Articles",
            count: articleCount,
            list: createArticles(articleCount),
          },
          biography: createBiography(),
          hasLeadAssets: false,
          image: "//www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg",
          jobTitle: "Defence Editor",
          name: "Deborah Haynes",
          twitter: "jdoe",
          slug: 'deborah-haynes',
          name: 'Debbooorrrraaaahhh'
        };
      }
    }
  }
}
