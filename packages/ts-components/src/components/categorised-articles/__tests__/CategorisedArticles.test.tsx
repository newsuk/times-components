import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CategorisedArticles } from '../CategorisedArticles';

describe('render CategorisedArticles', () => {
  it('should render header and slice with articles when valid props provided', () => {
    const mockArticles = [{ headline: 'Test Article' }];
    const mockFireEvent = jest.fn();

    jest.mock('../../../helpers/tracking/TrackingContextProvider', () => ({
      useTrackingContext: () => ({
        fireAnalyticsEvent: mockFireEvent,
      }),
    }));

    const { container, asFragment } = render(
      <CategorisedArticles heading="Sports" articles={mockArticles} />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(
      container.querySelector('#categorised-articles')
    ).toBeInTheDocument();
    expect(screen.getByText('More from Sports')).toBeInTheDocument();
  });
});
