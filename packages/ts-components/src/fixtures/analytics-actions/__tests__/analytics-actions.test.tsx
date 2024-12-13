import analyticsAction from '../analytics-actions';
import { action } from '@storybook/addon-actions';

jest.mock('@storybook/addon-actions', () => ({
  action: jest.fn(() => jest.fn())
}));

describe('analyticsAction', () => {
  const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {
    // Empty block
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs the event to the console and calls the Storybook action', () => {
    const event = { type: 'test-event', payload: 'test-payload' };
    const storybookActionMock = jest.fn();
    (action as jest.Mock).mockReturnValue(storybookActionMock);

    analyticsAction(event);

    expect(consoleLogMock).toHaveBeenCalledWith('analytics-action', event);

    expect(action).toHaveBeenCalledWith('analytics-action');

    expect(storybookActionMock).toHaveBeenCalledWith(event);
  });

  it('handles an array of events', () => {
    const events = [
      { type: 'test-event-1', payload: 'test-payload-1' },
      { type: 'test-event-2', payload: 'test-payload-2' }
    ];
    const storybookActionMock = jest.fn();
    (action as jest.Mock).mockReturnValue(storybookActionMock);

    analyticsAction(events);

    expect(consoleLogMock).toHaveBeenCalledWith('analytics-action', events);

    expect(action).toHaveBeenCalledWith('analytics-action');

    expect(storybookActionMock).toHaveBeenCalledWith(events);
  });
});
