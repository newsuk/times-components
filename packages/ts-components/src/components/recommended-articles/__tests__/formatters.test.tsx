import { getArticles } from '../helpers';
import previewData from '../../../fixtures/preview-data/recommended-articles';

import { getRecommendedArticlesSlice } from '../formatters';

const expectedArticles = [
  {
    byline:
      'Rosie Green | Frankie Graddon | Tony Turnbull | Charlie Gowans-Eglinton',
    datePublished: '2022-07-26T23:01:00.000Z',
    headline: 'Save or splurge: what experts spend their own money on',
    images: {
      alt: 'Save or splurge: what experts spend their own money on',
      crops: [
        {
          ratio: '16:9',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F831e0f3c-e5b7-11ec-9b02-3f136f233710.jpg?crop=1600%2C900%2C0%2C0'
        }
      ]
    },
    label: null,
    summary:
      'How is your bank balance? Even if the cost of living crisis doesn’t constitute a crisis for you, you’ll have noticed that you’re suddenly paying more for  and what felt reasonable may now...',
    url:
      'https://www.thetimes.co.uk/article/save-or-splurge-what-experts-spend-their-own-money-on-tdd65qlj6'
  },
  {
    byline: '',
    datePublished: '2022-07-27T16:00:00.000Z',
    headline: 'Lieutenant Colonel Ian Crooke',
    images: {
      alt: 'Lieutenant Colonel Ian Crooke',
      crops: [
        {
          ratio: '16:9',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F5ecb5d44-e650-11ec-9b02-3f136f233710.jpg?crop=5616%2C3159%2C0%2C293'
        }
      ]
    },
    label: 'Obituary',
    summary:
      'On August 1, 1981, Major Ian Crooke, the operations officer of 22 Special Air Service in Hereford, received a telephone call from London. A Marxist coup d’état was taking place in the former British...',
    url:
      'https://www.thetimes.co.uk/article/lieutenant-colonel-ian-crooke-obituary-t0b890wgp'
  },
  {
    byline: 'Patrick Maguire',
    datePublished: '2022-07-27T08:00:00.000Z',
    headline: 'Is the party over for Johnson?',
    images: {
      alt: 'Is the party over for Johnson?',
      crops: [
        {
          ratio: '16:9',
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Feb05c224-e626-11ec-aa87-2eea7c6e5b01.jpg?crop=1500%2C844%2C0%2C78'
        }
      ]
    },
    label: 'RED BOX | PATRICK MAGUIRE',
    summary:
      'Worse than May. Worse than Major. As bad as Thatcher. of his own MPs, far more than even the most pessimistic whip predicted this time yesterday. Can Boris...',
    url:
      'https://www.thetimes.co.uk/article/is-the-party-over-for-boris-johnson-k8s0jxv6r'
  }
];

describe('getRecommendedArticlesSlice()', () => {
  it('should return the correctly formattted slice including 1 article', () => {
    const data = getArticles(previewData, 1);
    const articles = data.recommendations.articles;
    const slice = getRecommendedArticlesSlice(articles);

    expect(slice).toStrictEqual({
      children: [{ article: expectedArticles[0] }],
      name: 'RELATED_ARTICLE_1'
    });
  });

  it('should return the correctly formattted slice including 2 articles', () => {
    const data = getArticles(previewData, 2);
    const articles = data.recommendations.articles;
    const slice = getRecommendedArticlesSlice(articles);

    expect(slice).toStrictEqual({
      children: [
        { article: expectedArticles[0] },
        { article: expectedArticles[1] }
      ],
      name: 'RELATED_ARTICLE_2'
    });
  });

  it('should return the correctly formattted slice including 3 articles', () => {
    const articles = previewData.recommendations.articles;
    const slice = getRecommendedArticlesSlice(articles as any);

    expect(slice).toStrictEqual({
      children: [
        { article: expectedArticles[0] },
        { article: expectedArticles[1] },
        { article: expectedArticles[2] }
      ],
      name: 'RELATED_ARTICLE_3'
    });
  });
});
