import MockDate from 'mockdate';

import { getTimeSince } from '../getTimeSince';

const article = {
  id: '1111',
  images: { crops: [] },
  headline: '',
  datePublished: '2020-08-20T12:00:00.000Z',
  url: ''
};

describe('getTimeSince', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return the correct time in seconds', () => {
    MockDate.set('2020-08-20T12:00:10.000Z');

    const time = getTimeSince(article);
    expect(time).toBe('10 seconds ago');
  });

  it('should return the correct time in minutes', () => {
    MockDate.set('2020-08-20T12:20:00.000Z');

    const time = getTimeSince(article);
    expect(time).toBe('20 minutes ago');
  });

  it('should return the correct time hours', () => {
    MockDate.set('2020-08-20T14:00:00.000Z');

    const time = getTimeSince(article);
    expect(time).toBe('2 hours ago');
  });

  it('should return the correct time days', () => {
    MockDate.set('2020-08-22T14:00:00.000Z');

    const time = getTimeSince(article);
    expect(time).toBe('2 days ago');
  });

  it('should return null when an article is >= 7 days old', () => {
    MockDate.set('2020-08-27T12:00:00.000Z');

    const time = getTimeSince(article);
    expect(time).toBe(null);
  });
});
