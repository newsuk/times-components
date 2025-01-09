import React from 'react';
import { QuizleSidebar, QuizleSideBarProps } from '../QuizleSidebar';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTrackingContext } from '../../../helpers/tracking/TrackingContextProvider';

jest.mock('../../../helpers/tracking/TrackingContextProvider', () => ({
  useTrackingContext: jest.fn()
}));

const mockFireAnalyticsEvent = jest.fn();

const defaultProps: QuizleSideBarProps = {
  sectionTitle: 'Puzzles for you',
  pageLink: 'https://www.thetimes.com/puzzles'
};

const renderComponent = (props: QuizleSideBarProps) =>
  render(<QuizleSidebar {...props} />);

describe('QuizleSidebar', () => {
  beforeEach(() => {
    (useTrackingContext as jest.Mock).mockReturnValue({
      fireAnalyticsEvent: mockFireAnalyticsEvent
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render QuizleSidebar component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call fireAnalyticsEvent when header is clicked', () => {
    const { container } = renderComponent(defaultProps);
    fireEvent.click(container.querySelector('.trigger')!);

    expect(mockFireAnalyticsEvent).toHaveBeenCalledWith({
      object: 'QuizleSidebar',
      action: 'Clicked',
      attrs: {
        event_navigation_action: 'navigation',
        event_navigation_name: 'quizle sidebar: header selected',
        event_navigation_browsing_method: 'click',
        component_name: 'Quizle Sidebar'
      }
    });
  });

  it('should call fireAnalyticsEvent when a puzzle card is clicked', () => {
    const { container } = renderComponent(defaultProps);
    fireEvent.click(container.querySelector('.quizle-link')!);

    expect(mockFireAnalyticsEvent).toHaveBeenCalledWith({
      object: 'QuizleSidebar',
      action: 'Clicked',
      attrs: {
        event_navigation_action: 'navigation',
        event_navigation_name: 'quizle sidebar: link selected',
        event_navigation_browsing_method: 'click',
        component_name: 'Quizle Sidebar',
      }
    });
  });
});
