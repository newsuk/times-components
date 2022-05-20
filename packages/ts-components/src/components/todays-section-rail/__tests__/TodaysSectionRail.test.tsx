import { todaysSection } from '../fixtures/fixtures';
import { render } from '@testing-library/react';
import React from 'react';
import { TodaysSectionRail } from '../TodaysSectionRail';

describe('<TodaysSectionRail>', () => {
  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        // @ts-ignore
        resolvedOptions: () => ({ timeZone: 'Europe/London' })
      })
    };
  });

  it('renders ', () => {
    const { getByText, getAllByTestId} = render(
      <TodaysSectionRail
        analyticsStream={jest.fn()}
        todaysSection={todaysSection[4]}
      />
    );

    getByText("Today's Sport")
    expect(getAllByTestId('related-article-item')).toHaveLength(3)
  });

  it('no data ', () => {
    const { asFragment, getByText  } = render(
      <TodaysSectionRail
        analyticsStream={jest.fn()}
        todaysSection={{ section: 'Sport', items: [] }}
      />
    );

    getByText("Today's Sport")
    expect(asFragment()).toMatchSnapshot();
  });
});
