import { LeadArticleProps } from '../../../../components/slices/lead-article/index';
import { groupArticlesByDate, sortByDatePublished } from '../index';

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

describe('sortByDatePublished', () => {
  it('should return a negative number if dateA is earlier than dateB', () => {
    const dateA: LeadArticleProps = {
      id: '1',
      headline: 'Article 1',
      hasVideo: false,
      url: 'https://www.thetimes.co.uk',
      datePublished: '2023-01-01T12:00:00.000Z'
    };
    const dateB: LeadArticleProps = {
      id: '2',
      headline: 'Article 2',
      hasVideo: false,
      url: 'https://www.thetimes.co.uk',
      datePublished: '2023-01-02T12:00:00.000Z'
    };
    const result = sortByDatePublished(dateA, dateB);
    expect(result).toBeLessThan(0);
  });

  it('should return a positive number if dateA is later than dateB', () => {
    const dateA: LeadArticleProps = {
      id: '3',
      headline: 'Article 3',
      hasVideo: false,
      url: 'https://www.thetimes.co.uk',
      datePublished: '2023-01-02T12:00:00.000Z'
    };
    const dateB: LeadArticleProps = {
      id: '4',
      headline: 'Article 4',
      hasVideo: false,
      url: 'https://www.thetimes.co.uk',
      datePublished: '2023-01-01T12:00:00.000Z'
    };
    const result = sortByDatePublished(dateA, dateB);
    expect(result).toBeGreaterThan(0);
  });

  it('should return a negative number if dateA is later than dateB and set to descending order', () => {
    const dateA: LeadArticleProps = {
      id: '3',
      headline: 'Article 3',
      hasVideo: false,
      url: 'https://www.thetimes.co.uk',
      datePublished: '2023-01-02T12:00:00.000Z'
    };
    const dateB: LeadArticleProps = {
      id: '4',
      headline: 'Article 4',
      hasVideo: false,
      url: 'https://www.thetimes.co.uk',
      datePublished: '2023-01-01T12:00:00.000Z'
    };
    const result = sortByDatePublished(dateA, dateB, 'dsc');
    expect(result).toBeLessThan(0);
  });

  it('should return 0 if both dates are equal', () => {
    const dateA: LeadArticleProps = {
      id: '5',
      headline: 'Article 5',
      hasVideo: false,
      url: 'https://www.thetimes.co.uk',
      datePublished: '2023-01-01T12:00:00.000Z'
    };
    const dateB: LeadArticleProps = {
      id: '6',
      headline: 'Article 6',
      hasVideo: false,
      url: 'https://www.thetimes.co.uk',
      datePublished: '2023-01-01T12:00:00.000Z'
    };
    const result = sortByDatePublished(dateA, dateB);
    expect(result).toBe(0);
  });
});
