import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/provider-test-tools";
import { article as articleQuery } from "@times-components/provider-queries";
import fixture from "@times-components/provider-test-tools/fixtures/article";
import { ArticleProvider } from "../src/provider";

const mocks = [
  {
    request: {
      query: articleQuery,
      variables: {
        id: "113e9875-b7bf-4dd7-ac99-dee231bf6e74"
      }
    },
    result: fixture({
      byline: [
        {
          name: "text",
          attributes: {
            value: "Test"
          },
          children: []
        }
      ],
      content: [
        {
          name: "paragraph",
          attributes: {},
          children: [
            {
              name: "text",
              attributes: {
                value: "A paragraph"
              },
              children: []
            }
          ]
        }
      ],
      flags: ["NEW"],
      hasVideo: false,
      keywords: ["WORD"],
      leadAsset: {
        type: "Image",
        id: "263b03a1-2ce6-4b94-b053-0d35316548c5",
        title: "Title",
        credits: "Credits",
        caption: "Caption",
        crop: {
          ratio: "16:9",
          url: "https://image.io/image",
          __typename: "Crop"
        },
        __typename: "Image"
      },
      relatedArticleSlice: {
        __typename: "StandardSlice",
        items: [
          {
            __typename: "Tile",
            article: {
              id: "ea16d744-cb4a-11e4-a202-50ac5def393a",
              hasVideo: false,
              headline: "Related Headline",
              shortHeadline: "Related Short Headline",
              section: "related",
              shortIdentifier: "37b27qd2s",
              slug: "france-defies-may-over-russia",
              byline: [
                {
                  name: "text",
                  attributes: {
                    value: "Patrick Kidd"
                  },
                  children: []
                }
              ],
              label: "Label",
              publicationName: "TIMES",
              publishedTime: "2015-03-23T19:39:39.000Z",
              summary105: [
                {
                  name: "text",
                  attributes: {
                    value: "Summary 105"
                  },
                  children: []
                }
              ],
              summary125: [
                {
                  name: "text",
                  attributes: {
                    value: "Summary 125"
                  },
                  children: []
                }
              ],
              summary145: [
                {
                  name: "text",
                  attributes: {
                    value: "Summary 145"
                  },
                  children: []
                }
              ],
              summary160: [
                {
                  name: "text",
                  attributes: {
                    value: "Summary 160"
                  },
                  children: []
                }
              ],
              summary175: [
                {
                  name: "text",
                  attributes: {
                    value: "Summary 175"
                  },
                  children: []
                }
              ],
              summary225: [
                {
                  name: "text",
                  attributes: {
                    value: "Summary 225"
                  },
                  children: []
                }
              ],
              leadAsset: {
                id: "6c1c108e-ed63-47af-df1d-46c63be16627",
                title: "RA Lead Title",
                crop169: {
                  url: "https://image.io/169",
                  __typename: "Crop"
                },
                crop32: {
                  url: "https://image.io/32",
                  __typename: "Crop"
                },
                __typename: "Image"
              },
              url: "https://some-url",
              __typename: "Article"
            }
          }
        ]
      },
      standfirst: "Standfirst",
      topics: [
        {
          name: "Islington",
          slug: "islington",
          __typename: "Topic"
        }
      ],
      url: "https://article.io"
    })
  }
];

const renderComponent = child =>
  renderer.create(
    <MockedProvider mocks={mocks}>
      <ArticleProvider
        debounceTimeMs={0}
        id="113e9875-b7bf-4dd7-ac99-dee231bf6e74"
      >
        {child}
      </ArticleProvider>
    </MockedProvider>
  );

describe("ArticleProvider", () => {
  it("returns query result", done => {
    renderComponent(({ article, isLoading }) => {
      if (!isLoading) {
        expect(article).toMatchSnapshot();
        done();
      }

      return null;
    });
  });
});
