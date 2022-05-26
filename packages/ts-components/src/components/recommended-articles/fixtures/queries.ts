import { recommendations } from '@times-components/provider-queries';

import { Article } from '../formatters';

export const mockQueries = (articles: Article[]) => [
  {
    request: {
      query: recommendations,
      variables: {
        publisher: 'TIMES',
        recomArgs: {
          userId: '1234',
          articleId: '94a01926-719a-11ec-aacf-0736e08b15cd'
        }
      }
    },
    result: {
      data: {
        recommendations: {
          __typename: 'Recommendations',
          articles
        }
      }
    }
  }
];
