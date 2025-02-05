import React from 'react';
import { ArticleSidebar, ArticleSideBarProps } from '../ArticleSidebar';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTrackingContext } from '../../../helpers/tracking/TrackingContextProvider';

jest.mock('../../../helpers/tracking/TrackingContextProvider', () => ({
  useTrackingContext: jest.fn(),
}));

const mockFireAnalyticsEvent = jest.fn();

const defaultProps: ArticleSideBarProps = {
  sectionTitle: 'Puzzles for you',
  data: [
    {
      title: 'Crossword',
      url: 'https://www.thetimes.com/puzzles/crossword',
      imgUrl:
        'https://www.thetimes.com/imageserver/image/%2Fpuzzles%2Ficons%2F33b27655-dcc9-421f-906f-b2b10dd26865.png?crop=1250%2C833%2C0%2C0&resize=500',
    },
    {
      title: 'Polygon',
      url: 'https://www.thetimes.com/puzzles/sudoku',
      imgUrl:
        'https://www.thetimes.com/imageserver/image/%2Fpuzzles%2Ficons%2F33b27655-dcc9-421f-906f-b2b10dd26865.png?crop=1250%2C833%2C0%2C0&resize=500',
    },
  ],
  pageLink: 'https://www.thetimes.com/puzzles',
};

const renderComponent = (props: ArticleSideBarProps) =>
  render(<ArticleSidebar {...props} />);

describe('ArticleSidebar', () => {
  beforeEach(() => {
    (useTrackingContext as jest.Mock).mockReturnValue({
      fireAnalyticsEvent: mockFireAnalyticsEvent,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render ArticleSidebar component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call fireAnalyticsEvent when header is clicked', () => {
    const { container } = renderComponent(defaultProps);
    fireEvent.click(container.querySelector('.trigger')!);

    expect(mockFireAnalyticsEvent).toHaveBeenCalledWith({
      object: 'ArticleSidebar',
      action: 'Clicked',
      attrs: {
        event_navigation_action: 'navigation',
        event_navigation_name: 'puzzle sidebar: header selected',
        event_navigation_browsing_method: 'click',
        component_name: 'Article Sidebar',
      },
    });
  });

  it('should call fireAnalyticsEvent when a puzzle card is clicked', () => {
    const { container } = renderComponent(defaultProps);
    fireEvent.click(container.querySelector('.trigger-card-link')!);

    expect(mockFireAnalyticsEvent).toHaveBeenCalledWith({
      object: 'ArticleSidebar',
      action: 'Clicked',
      attrs: {
        event_navigation_action: 'navigation',
        event_navigation_name: 'puzzle sidebar: puzzle selected',
        event_navigation_browsing_method: 'click',
        component_name: 'Article Sidebar',
        article_parent_name: 'crossword',
      },
    });
  });
});
