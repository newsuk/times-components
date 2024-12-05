// getDeckApiUrl.test.ts
import { getDeckApiUrl } from '../getDeckApiUrl';

describe('getDeckApiUrl', () => {
  beforeEach(() => {
    (global as any).window = {};
  });

  afterEach(() => {
    delete (global as any).window;
  });

  it('should return the production URL when environmentName is prod', () => {
    (global as any).window.__TIMES_CONFIG__ = {
      environmentName: 'prod'
    };
    expect(getDeckApiUrl()).toBe(
      'https://editorial-tm.newsapis.co.uk/prod/deck-component-data-api'
    );
  });

  it('should return the staging URL when environmentName is not prod', () => {
    (global as any).window.__TIMES_CONFIG__ = {
      environmentName: 'staging'
    };
    expect(getDeckApiUrl()).toBe(
      'https://editorial-tm.staging.newsapis.co.uk/staging/deck-component-data-api'
    );
  });

  it('should return the staging URL when window is undefined', () => {
    delete (global as any).window;
    expect(getDeckApiUrl()).toBe(
      'https://editorial-tm.staging.newsapis.co.uk/staging/deck-component-data-api'
    );
  });

  it('should return the staging URL when __TIMES_CONFIG__ is undefined', () => {
    (global as any).window = {};
    expect(getDeckApiUrl()).toBe(
      'https://editorial-tm.staging.newsapis.co.uk/staging/deck-component-data-api'
    );
  });
});
