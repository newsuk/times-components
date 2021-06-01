import searchRelatedArticles from "../src/algolia-related-articles.web";

const article = {
  headline: "Headline with some upper case",
  section: "sports",
  topics: [
    {
      name: "Football"
    },
    { name: "Premier league" }
  ],
  bylines: [
    {
      byline: [
        {
          attributes: {},
          children: [
            {
              attributes: {
                value: "By lines here"
              },
              children: [],
              name: "text"
            }
          ],
          name: "inline"
        }
      ]
    }
  ]
};

const resultArticle = {
  content: ""
};

describe("searchRelatedArticles", () => {
  describe("fallbacks", () => {
    it("1 pass", async () => {
      const index = {
        search: jest
          .fn()
          .mockReturnValueOnce({ nbHits: 1, hits: [resultArticle] })
      };
      const results = await searchRelatedArticles(index, article);

      expect(index.search).toBeCalledTimes(1);
      expect(index.search).toBeCalledWith(
        'Headline with some upper case football "premier league" "by lines here"',
        {
          filters: "section:sports",
          hitsPerPage: 3,
          ignorePlurals: true,
          optionalFilters: undefined,
          optionalWords: [
            "with",
            "some",
            "upper",
            "case",
            "football",
            "premier league",
            `by lines here`
          ],
          removeStopWords: true,
          typoTolerance: false
        }
      );

      expect(index.search.mock.results).toEqual([
        { type: "return", value: { hits: [{ content: "" }], nbHits: 1 } }
      ]);

      expect(results.count).toEqual(1);
    });

    it("2 pass", async () => {
      const index = {
        search: jest
          .fn()
          .mockReturnValueOnce({ nbHits: 0, hits: [] })
          .mockReturnValueOnce({
            nbHits: 1,
            hits: [resultArticle, resultArticle]
          })
      };
      const results = await searchRelatedArticles(index, article);

      expect(index.search).toBeCalledTimes(2);

      expect(index.search.mock.calls).toEqual([
        [
          'Headline with some upper case football "premier league" "by lines here"',
          {
            filters: "section:sports",
            hitsPerPage: 3,
            ignorePlurals: true,
            optionalFilters: undefined,
            optionalWords: [
              "with",
              "some",
              "upper",
              "case",
              "football",
              "premier league",
              "by lines here"
            ],
            removeStopWords: true,
            typoTolerance: false
          }
        ],
        [
          'Headline with some upper case football "premier league" "by lines here"',
          {
            filters: "",
            hitsPerPage: 3,
            ignorePlurals: true,
            optionalFilters: undefined,
            optionalWords: [
              "with",
              "some",
              "upper",
              "case",
              "football",
              "premier league",
              "by lines here"
            ],
            removeStopWords: true,
            typoTolerance: false
          }
        ]
      ]);

      expect(index.search.mock.results).toEqual([
        { type: "return", value: { hits: [], nbHits: 0 } },
        {
          type: "return",
          value: { hits: [{ content: "" }, { content: "" }], nbHits: 1 }
        }
      ]);

      expect(results.count).toEqual(1);
    });

    it("3 pass", async () => {
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
      const results = await searchRelatedArticles(index, article);

      expect(index.search).toBeCalledTimes(3);

      expect(index.search.mock.calls).toEqual([
        [
          'Headline with some upper case football "premier league" "by lines here"',
          {
            filters: "section:sports",
            hitsPerPage: 3,
            ignorePlurals: true,
            optionalFilters: undefined,
            optionalWords: [
              "with",
              "some",
              "upper",
              "case",
              "football",
              "premier league",
              "by lines here"
            ],
            removeStopWords: true,
            typoTolerance: false
          }
        ],
        [
          'Headline with some upper case football "premier league" "by lines here"',
          {
            filters: "",
            hitsPerPage: 3,
            ignorePlurals: true,
            optionalFilters: undefined,
            optionalWords: [
              "with",
              "some",
              "upper",
              "case",
              "football",
              "premier league",
              "by lines here"
            ],
            removeStopWords: true,
            typoTolerance: false
          }
        ],
        [
          'headline with some upper case football "premier league" "by lines here"',
          {
            filters: "section:sports",
            hitsPerPage: 3,
            ignorePlurals: true,
            optionalFilters: undefined,
            optionalWords: [
              "headline",
              "with",
              "some",
              "upper",
              "case",
              "football",
              "premier league",
              "by lines here"
            ],
            removeStopWords: true,
            typoTolerance: false
          }
        ]
      ]);

      expect(index.search.mock.results).toEqual([
        { type: "return", value: { hits: [], nbHits: 0 } },
        { type: "return", value: { hits: [], nbHits: 0 } },
        {
          type: "return",
          value: { hits: [{ content: "" }, { content: "" }], nbHits: 1 }
        }
      ]);

      expect(results.count).toEqual(1);
    });
    it("no results", async () => {
      const index = {
        search: jest
          .fn()
          .mockReturnValueOnce({ nbHits: 0, hits: [] })
          .mockReturnValueOnce({ nbHits: 0, hits: [] })
          .mockReturnValueOnce({ nbHits: 0, hits: [] })
      };
      const results = await searchRelatedArticles(index, article);

      expect(index.search).toBeCalledTimes(3);

      expect(results).toBeNull();
    });

    it("exception", async () => {
      const index = {
        search: jest.fn().mockImplementationOnce(() => {
          throw Error("an error");
        })
      };
      const results = await searchRelatedArticles(index, article);

      expect(results).toBeNull();
    });
  });
});
