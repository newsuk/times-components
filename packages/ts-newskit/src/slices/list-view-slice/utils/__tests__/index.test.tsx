import {
  groupArticlesByDate,
  removeDuplicateDates,
  sortByDatePublished
} from '../index';

describe('groupArticlesByDate', () => {
  it('should group articles by date', () => {
    const articles = [
      {
        id: '1',
        headline: 'Article 1',
        datePublished: '2023-12-01T08:00:00.000Z',
        hasVideo: false,
        url: 'https://www.thetimes.co.uk'
      },
      {
        id: '2',
        headline: 'Article 2',
        datePublished: '2023-12-01T12:00:00.000Z',
        hasVideo: false,
        url: 'https://www.thetimes.co.uk'
      },
      {
        id: '3',
        headline: 'Article 3',
        datePublished: '2023-12-02T10:00:00.000Z',
        hasVideo: false,
        url: 'https://www.thetimes.co.uk'
      }
    ];

    const expectedResult = {
      '2023-12-01': [
        {
          id: '1',
          headline: 'Article 1',
          datePublished: '2023-12-01T08:00:00.000Z',
          hasVideo: false,
          url: 'https://www.thetimes.co.uk'
        },
        {
          id: '2',
          headline: 'Article 2',
          datePublished: '2023-12-01T12:00:00.000Z',
          hasVideo: false,
          url: 'https://www.thetimes.co.uk'
        }
      ],
      '2023-12-02': [
        {
          id: '3',
          headline: 'Article 3',
          datePublished: '2023-12-02T10:00:00.000Z',
          hasVideo: false,
          url: 'https://www.thetimes.co.uk'
        }
      ]
    };
    const result = groupArticlesByDate(articles);
    expect(result).toEqual(expectedResult);
  });
});

describe('removeDuplicateDates', () => {
  it('should remove duplicate dates from the array', () => {
    const articles = [
      {
        id: '1',
        headline: 'Article 1',
        datePublished: '2023-12-01T08:00:00.000Z',
        hasVideo: false,
        url: 'https://www.thetimes.co.uk'
      },
      {
        id: '2',
        headline: 'Article 2',
        datePublished: '2023-12-01T08:00:00.000Z',
        hasVideo: false,
        url: 'https://www.thetimes.co.uk'
      },
      {
        id: '3',
        headline: 'Article 3',
        datePublished: '2023-12-02T10:00:00.000Z',
        hasVideo: false,
        url: 'https://www.thetimes.co.uk'
      }
    ];

    const expectedResult = [
      {
        id: '1',
        headline: 'Article 1',
        datePublished: '2023-12-01T08:00:00.000Z',
        hasVideo: false,
        url: 'https://www.thetimes.co.uk'
      },
      {
        id: '2',
        headline: 'Article 2',
        datePublished: undefined,
        hasVideo: false,
        url: 'https://www.thetimes.co.uk'
      },
      {
        id: '3',
        headline: 'Article 3',
        datePublished: '2023-12-02T10:00:00.000Z',
        hasVideo: false,
        url: 'https://www.thetimes.co.uk'
      }
    ];

    const result = removeDuplicateDates(articles);
    expect(result).toEqual(expectedResult);
  });
});

describe('sortByDatePublished', () => {
  it('should correctly sort articles by datePublished', () => {
    const article1 = {
      id: '1',
      datePublished: '2023-12-01T08:00:00.000Z',
      headline: 'Article 1',
      hasVideo: false,
      url: 'https://www.thetimes.co.uk'
    };

    const article2 = {
      id: '2',
      datePublished: '2023-12-02T12:00:00.000Z',
      headline: 'Article 2',
      hasVideo: false,
      url: 'https://www.thetimes.co.uk'
    };

    const article3 = {
      id: '3',
      datePublished: '2023-12-01T10:00:00.000Z',
      headline: 'Article 3',
      hasVideo: false,
      url: 'https://www.thetimes.co.uk'
    };

    const sortedArticles = [article1, article2, article3].sort(
      sortByDatePublished
    );

    expect(sortedArticles).toEqual([article1, article3, article2]);
  });
});
