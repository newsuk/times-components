import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';

import 'regenerator-runtime';
import '@testing-library/jest-dom';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <>Placeholder</>
}));

const mockInitSettings = jest.fn();
const mockInitStyleSheet = jest.fn();
const mockInitComponent = jest.fn();

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

import { OptaFootballPlayerStats } from '../OptaFootballPlayerStats';

const requiredProps = {
  season: '2020',
  competition: '3',
  visible_categories: 'goals',
  match: '2041900'
};

describe('OptaFootballPlayerStats', () => {
  it('should render correctly', async () => {
    const { asFragment, getByText } = render(
      <OptaFootballPlayerStats {...requiredProps} />
    );
    expect(asFragment()).toMatchSnapshot();

    await waitForElementToBeRemoved(getByText('Placeholder'));

    expect(mockInitSettings).toHaveBeenCalledTimes(2);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(2);
    expect(mockInitComponent).toHaveBeenCalledTimes(2);

    expect(asFragment()).toMatchSnapshot();
  });
});
