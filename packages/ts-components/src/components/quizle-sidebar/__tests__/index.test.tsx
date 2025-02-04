import React from 'react';
import { QuizleSidebar, QuizleSideBarProps } from '../QuizleSidebar';
import { render, fireEvent, waitFor } from '@testing-library/react';
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
    jest.clearAllMocks();
    (useTrackingContext as jest.Mock).mockReturnValue({
      fireAnalyticsEvent: mockFireAnalyticsEvent
    });

    // Manually mock fetch before each test
    global.fetch = jest.fn();
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
        component_name: 'Quizle Sidebar'
      }
    });
  });

  it('should handle API failure and use the backup question', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    const { getByText } = renderComponent(defaultProps);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(
      getByText(
        "Which type of dog gets its name from the Welsh words for 'dwarf' and 'dog'?"
      )
    ).toBeInTheDocument();
  });

  it('should display backup question if API returns no questions', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue([])
    });

    const { getByText } = renderComponent(defaultProps);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(
      getByText(
        `Which type of dog gets its name from the Welsh words for 'dwarf' and 'dog'?`
      )
    ).toBeInTheDocument();
  });

  it("should display today's question if API provides a valid question", async () => {
    const today = new Date().toISOString(); // Get today's date in ISO format

    // Mock API returning a valid question for today
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          publishDate: today,
          question: 'What is the capital of France?',
          solution: 'Paris'
        }
      ])
    });

    const { getByText } = renderComponent(defaultProps);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(getByText('What is the capital of France?')).toBeInTheDocument();
  });
});
