import React from 'react';

import RelatedArticles from '@times-components/related-articles';
import { GetRecommendedArticles } from '@times-components/provider';

import { RelatedArticleSliceType } from '../../types/related-article-slice';

import { Placeholder } from '@times-components/image';

type RecommendedArticlesProps = {
  articleId: string;
  section: string;
  analyticsStream?: (evt: any) => void;
};

export const RecommendedArticles = ({
  articleId,
  section,
  analyticsStream
}: RecommendedArticlesProps) => {
  return (
    <GetRecommendedArticles
      publisher={'TIMES'}
      recomArgs={{ userId: '1234', articleId }}
      ssr={false}
      debounceTimeMs={0}
    >
      {({ isLoading, error, recommendations }: any) => {
        if (error) {
          return null;
        }

        if (isLoading || !recommendations) {
          return (
            <div className="placeholder">
              <Placeholder />
            </div>
          );
        }

        const slice: RelatedArticleSliceType = {
          sliceName: 'StandardSlice',
          items: recommendations
            ? recommendations.articles.map((article: any) => ({ article }))
            : []
        };

        /*const slice: RelatedArticleSliceType = {
          sliceName: 'StandardSlice',
          items: [
            {
              article: {
                bylines: [
                  {
                    byline: [
                      {
                        attributes: {
                          slug: 'camilla-long'
                        },
                        children: [
                          {
                            attributes: {
                              value: 'Camilla Long'
                            },
                            children: [],
                            name: 'text'
                          }
                        ],
                        name: 'author'
                      }
                    ]
                  }
                ],
                hasVideo: false,
                headline: 'Headline',
                id: '48604618-fb0e-11e7-a987-7fcf5e9983dc',
                label: 'label',
                leadAsset: {
                  crop169: {
                    url: 'https://www.thetimes.co.uk/image.png'
                  },
                  title: 'Image title'
                },
                publicationName: 'TIMES',
                publishedTime: '2015-03-13T18:54:58.000Z',
                section: 'News',
                shortHeadline: 'Headline',
                shortIdentifier: '123456789',
                slug: 'slug',

                summary105: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'summary 1'
                    },
                    children: []
                  }
                ],
                summary125: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'summary 2'
                    },
                    children: []
                  }
                ],
                summary145: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'summary 3'
                    },
                    children: []
                  }
                ],
                summary160: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'summary 4'
                    },
                    children: []
                  }
                ],
                summary175: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'summary 5'
                    },
                    children: []
                  }
                ],
                summary225: [
                  {
                    name: 'text',
                    attributes: {
                      value: 'summary 6'
                    },
                    children: []
                  }
                ],

                url: 'https://www.thetimes.co.uk'
              },
              leadAsset: null
            }
          ]
        };*/

        return (
          <RelatedArticles
            heading={`Today's ${section}`}
            slice={slice}
            isVisible
            analyticsStream={analyticsStream}
          />
        );
      }}
    </GetRecommendedArticles>
  );
};
