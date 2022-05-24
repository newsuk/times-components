import { todaysSection } from '../fixtures/fixtures';
import { render } from '@testing-library/react';
import React from 'react';
import { TodaysSectionRail } from '../TodaysSectionRail';
// ADD SESSION STORAGE TESTS

const recomArgs = {
  userId: '1234',
  articleId: '94a01926-719a-11ec-aacf-0736e08b15cd'
};
describe('<TodaysSectionRail>', () => {
  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        // @ts-ignore
        resolvedOptions: () => ({ timeZone: 'Europe/London' })
      })
    };
  });

  afterEach(() => {
    window.sessionStorage.clear();
  });

  it('should render', () => {
    window.sessionStorage.setItem('showTodaysArticleRail', 'true');

    const { getByText, getAllByTestId } = render(
      <TodaysSectionRail
        analyticsStream={jest.fn()}
        todaysSection={todaysSection[4]}
        recomArgs={recomArgs}
      />
    );

    getByText("Today's Sport");
    expect(getAllByTestId('related-article-item')).toHaveLength(3);
  });

  it('should not render when there is not a feature flag', () => {
    const { queryByText, queryByTestId } = render(
      <TodaysSectionRail
        analyticsStream={jest.fn()}
        todaysSection={todaysSection[4]}
        recomArgs={recomArgs}
      />
    );
    expect(queryByText("Today's Sport")).not.toBe;
    expect(queryByTestId('related-article-item')).toEqual(null);
  });

  it('should not render without data ', () => {
    const { queryByText, queryByTestId } = render(
      <TodaysSectionRail
        analyticsStream={jest.fn()}
        todaysSection={{ section: 'Sport', items: [] }}
        recomArgs={recomArgs}
      />
    );
    expect(queryByText("Today's Sport")).not.toBe;
    expect(queryByTestId('related-article-item')).toEqual(null);
  });
});
