import React from 'react';
import { render, act } from '@testing-library/react';

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

import { OptaCricketScorecard } from '../OptaCricketScorecard';

const requiredProps = {
  competition: '2722',
  match: '49716'
};

describe('OptaCricketScorecard', () => {
  it('should render correctly', async () => {
    const { asFragment } = render(<OptaCricketScorecard {...requiredProps} />);

    act(() => {
      mockInitComponent();
      mockHasMatchEvents();
    });

    expect(mockInitSettings).toHaveBeenCalledTimes(1);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(1);
    expect(mockInitComponent).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
});
