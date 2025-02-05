import analyticsAction from '../analytics-actions';
import { action } from '@storybook/addon-actions';

// Mock the '@storybook/addon-actions' module
jest.mock('@storybook/addon-actions', () => ({
  action: jest.fn(() => jest.fn()),
}));

describe('analyticsAction', () => {
  const testEvent = { type: 'click', payload: { button: 'submit' } };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should log the event to console and call storybook action with the event', () => {
    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    // Mock the action handler returned by storybook's action
    const mockActionHandler = jest.fn();
    (action as jest.Mock).mockReturnValue(mockActionHandler);

    // Invoke the function with the test event
    analyticsAction(testEvent);

    // Assertions
    expect(consoleSpy).toHaveBeenCalledWith('analytics-action', testEvent);
    expect(action).toHaveBeenCalledWith('analytics-action');
    expect(mockActionHandler).toHaveBeenCalledWith(testEvent);

    // Restore the original console.log implementation
    consoleSpy.mockRestore();
  });

  it('should handle an array of events', () => {
    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    // Define an array of events
    const events = [
      { type: 'click', payload: { button: 'submit' } },
      { type: 'hover', payload: { element: 'image' } },
    ];

    // Mock the action handler returned by storybook's action
    const mockActionHandler = jest.fn();
    (action as jest.Mock).mockReturnValue(mockActionHandler);

    // Invoke the function with the array of events
    analyticsAction(events);

    // Assertions
    expect(consoleSpy).toHaveBeenCalledWith('analytics-action', events);
    expect(action).toHaveBeenCalledWith('analytics-action');
    expect(mockActionHandler).toHaveBeenCalledWith(events);

    // Restore the original console.log implementation
    consoleSpy.mockRestore();
  });
});
