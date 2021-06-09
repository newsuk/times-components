import mockDate from 'mockdate';
import searchRelatedArticles from '../algoliaRelatedArticles';

const article = {
  headline: 'Headline with some upper case',
  section: 'sports',
  topics: [
    {
      name: 'Football'
    },
    { name: 'Premier league' }
  ],
  bylines: [
    {
      byline: [
        {
          attributes: {},
          children: [
            {
              attributes: {
                value: 'By lines here'
              },
              children: [],
              name: 'text'
            }
          ],
          name: 'inline'
        }
      ]
    }
  ]
};

const resultArticle = {
  content: ''
};

describe('searchRelatedArticles', () => {
  //  GMT: Thursday, 14 March 2019 16:22:54
  beforeEach(() => {
    mockDate.set(1620000000000);
  });

  afterEach(() => {
    mockDate.reset();
  });

  describe('fallbacks', () => {
    it('1 pass', async () => {
      const index = {
        search: jest
          .fn()
          .mockReturnValueOnce({ nbHits: 1, hits: [resultArticle] })
      };

      // @ts-ignore
      const results = await searchRelatedArticles(index, article, jest.fn());

      expect(index.search).toBeCalledTimes(1);
      expect(index.search).toBeCalledWith(
        'Headline with some upper case football "premier league" "by lines here"',
        {
          filters:
            'section:sports AND algoliaData.publishedTimestamp >= 1619740800000',
          hitsPerPage: 3,
          ignorePlurals: true,
          optionalFilters: undefined,
          optionalWords: [
            'with',
            'some',
            'upper',
            'case',
            'football',
            'premier league',
            `by lines here`
          ],
          removeStopWords: true,
          typoTolerance: false
        }
      );

      expect(index.search.mock.results).toEqual([
        { type: 'return', value: { hits: [{ content: '' }], nbHits: 1 } }
      ]);

      expect(results!.count).toEqual(1);
    });

    it('2 pass', async () => {
      const index = {
        search: jest
          .fn()
          .mockReturnValueOnce({ nbHits: 0, hits: [] })
          .mockReturnValueOnce({
            nbHits: 1,
            hits: [resultArticle, resultArticle]
          })
      };
      // @ts-ignore
      const results = await searchRelatedArticles(index, article, jest.fn());

      expect(index.search).toBeCalledTimes(2);

      expect(index.search.mock.calls).toEqual([
        [
          'Headline with some upper case football "premier league" "by lines here"',
          {
            filters:
              'section:sports AND algoliaData.publishedTimestamp >= 1619740800000',
            hitsPerPage: 3,
            ignorePlurals: true,
            optionalFilters: undefined,
            optionalWords: [
              'with',
              'some',
              'upper',
              'case',
              'football',
              'premier league',
              'by lines here'
            ],
            removeStopWords: true,
            typoTolerance: false
          }
        ],
        [
          'Headline with some upper case football "premier league" "by lines here"',
          {
            filters: '',
            hitsPerPage: 3,
            ignorePlurals: true,
            optionalFilters: undefined,
            optionalWords: [
              'with',
              'some',
              'upper',
              'case',
              'football',
              'premier league',
              'by lines here'
            ],
            removeStopWords: true,
            typoTolerance: false
          }
        ]
      ]);

      expect(index.search.mock.results).toEqual([
        { type: 'return', value: { hits: [], nbHits: 0 } },
        {
          type: 'return',
          value: { hits: [{ content: '' }, { content: '' }], nbHits: 1 }
        }
      ]);

      expect(results!.count).toEqual(1);
    });

    it('3 pass', async () => {
      const index = {
        search: jest
          .fn()
          .mockReturnValueOnce({ nbHits: 0, hits: [] })
          .mockReturnValueOnce({ nbHits: 0, hits: [] })
          .mockReturnValueOnce({
            nbHits: 1,
            hits: [resultArticle, resultArticle]
          })
      };

      // @ts-ignore
      const results = await searchRelatedArticles(index, article, jest.fn());

      expect(index.search).toBeCalledTimes(3);

      expect(index.search.mock.calls).toEqual([
        [
          'Headline with some upper case football "premier league" "by lines here"',
          {
            filters:
              'section:sports AND algoliaData.publishedTimestamp >= 1619740800000',
            hitsPerPage: 3,
            ignorePlurals: true,
            optionalFilters: undefined,
            optionalWords: [
              'with',
              'some',
              'upper',
              'case',
              'football',
              'premier league',
              'by lines here'
            ],
            removeStopWords: true,
            typoTolerance: false
          }
        ],
        [
          'Headline with some upper case football "premier league" "by lines here"',
          {
            filters: '',
            hitsPerPage: 3,
            ignorePlurals: true,
            optionalFilters: undefined,
            optionalWords: [
              'with',
              'some',
              'upper',
              'case',
              'football',
              'premier league',
              'by lines here'
            ],
            removeStopWords: true,
            typoTolerance: false
          }
        ],
        [
          'headline with some upper case football "premier league" "by lines here"',
          {
            filters: 'section:sports',
            hitsPerPage: 3,
            ignorePlurals: true,
            optionalFilters: undefined,
            optionalWords: [
              'headline',
              'with',
              'some',
              'upper',
              'case',
              'football',
              'premier league',
              'by lines here'
            ],
            removeStopWords: true,
            typoTolerance: false
          }
        ]
      ]);

      expect(index.search.mock.results).toEqual([
        { type: 'return', value: { hits: [], nbHits: 0 } },
        { type: 'return', value: { hits: [], nbHits: 0 } },
        {
          type: 'return',
          value: { hits: [{ content: '' }, { content: '' }], nbHits: 1 }
        }
      ]);

      expect(results!.count).toEqual(1);
    });
    it('no results', async () => {
      const index = {
        search: jest
          .fn()
          .mockReturnValueOnce({ nbHits: 0, hits: [] })
          .mockReturnValueOnce({ nbHits: 0, hits: [] })
          .mockReturnValueOnce({ nbHits: 0, hits: [] })
      };
      // @ts-ignore
      const results = await searchRelatedArticles(index, article, jest.fn());

      expect(index.search).toBeCalledTimes(3);

      expect(results).toBeNull();
    });

    it('exception', async () => {
      const index = {
        search: jest.fn().mockImplementationOnce(() => {
          throw Error('an error');
        })
      };
      // @ts-ignore
      const results = await searchRelatedArticles(index, article, jest.fn());

      expect(results).toBeNull();
    });
  });
});
