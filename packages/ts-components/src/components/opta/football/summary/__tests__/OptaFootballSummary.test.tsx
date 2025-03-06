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

import { OptaFootballSummary } from '../OptaFootballSummary';

const requiredProps = {
  season: '2020',
  competition: '3',
  match: '2041900'
};

describe('OptaFootballSummary', () => {
  it('should render correctly', async () => {
    const { asFragment, getByText } = render(
      <OptaFootballSummary {...requiredProps} />
    );
    expect(asFragment()).toMatchSnapshot();

    await waitForElementToBeRemoved(getByText('Placeholder'));

    expect(mockInitSettings).toHaveBeenCalledTimes(1);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(1);
    expect(mockInitComponent).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
});
