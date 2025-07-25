import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';

import 'regenerator-runtime';
import '@testing-library/jest-dom';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <>Placeholder</>
}));

const mockInitSettings = jest.fn();
const mockInitStyleSheet = jest.fn();
const mockInitComponent = jest.fn();
const mockHasMatchEvents = jest.fn();

const mockInitElement = () => {
  const element = document.createElement('div');
  element.appendChild(document.createTextNode('Widget'));
  return element;
};

jest.mock('../../../utils/config', () => ({
  initSettings: mockInitSettings,
  initStyleSheet: mockInitStyleSheet,
  initScript: () => new Promise(resolve => resolve({})),
  initElement: mockInitElement,
  initComponent: mockInitComponent
}));

jest.mock('../../../utils/hasMatchEvents', () => ({
  hasMatchEvents: mockHasMatchEvents
}));

import { OptaRugbySummary } from '../OptaRugbySummary';

const requiredProps = {
  season: '2022',
  competition: '209',
  match: '921100'
};
describe('OptaRugbySummary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { asFragment } = render(<OptaRugbySummary {...requiredProps} />);

    act(() => {
      mockInitComponent();
      mockHasMatchEvents();
    });

    expect(mockInitSettings).toHaveBeenCalledTimes(1);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(1);
    expect(mockInitComponent).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should disable the button initially', () => {
    const { getByRole } = render(<OptaRugbySummary {...requiredProps} />);
    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should enable the button when enableButton message is received', () => {
    const { getByRole } = render(<OptaRugbySummary {...requiredProps} />);
    const button = getByRole('button');
    expect(button).toBeDisabled();

    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', { data: 'enableButton' })
      );
    });

    expect(button).not.toBeDisabled();
  });

  it('should toggle details when button is clicked', () => {
    const { getByRole, getByText } = render(
      <OptaRugbySummary {...requiredProps} />
    );
    const button = getByRole('button');

    // Enable the button first
    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', { data: 'enableButton' })
      );
    });

    expect(button).toHaveTextContent('Show Details');
    fireEvent.click(button);
    expect(button).toHaveTextContent('Hide Details');
    fireEvent.click(button);
    expect(button).toHaveTextContent('Show Details');
  });

  it('should add and remove the message event listener on mount and unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    const { unmount } = render(<OptaRugbySummary {...requiredProps} />);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'message',
      expect.any(Function)
    );

    unmount();
  });

  it('should not enable the button if message event data is not "enableButton"', () => {
    const { getByRole } = render(<OptaRugbySummary {...requiredProps} />);
    const button = getByRole('button');
    expect(button).toBeDisabled();

    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', { data: 'someOtherEvent' })
      );
    });

    expect(button).toBeDisabled();
  });
});
