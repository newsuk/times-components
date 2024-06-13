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

import { OptaFootballFixturesTournament } from '../OptaFootballFixturesTournament';

afterEach(() => {
  jest.clearAllMocks();
});

describe('OptaFootballFixturesTournament', () => {
  it('should render national competitions correctly', async () => {
    const { asFragment, getByText } = render(
      <OptaFootballFixturesTournament season="2023" competition="3" />
    );
    expect(asFragment()).toMatchSnapshot();

    await waitForElementToBeRemoved(getByText('Placeholder'));

    expect(mockInitSettings).toHaveBeenCalledTimes(1);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(1);
    expect(mockInitComponent).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
  it('should render full width correctly', async () => {
    const { asFragment, getByText } = render(
      <OptaFootballFixturesTournament season="2023" competition="3" full_width />
    );
    expect(asFragment()).toMatchSnapshot();

    await waitForElementToBeRemoved(getByText('Placeholder'));

    expect(asFragment()).toMatchSnapshot();
  });
  it('should render national competitions correctly with single column', async () => {
    const { asFragment, getByText } = render(
      <OptaFootballFixturesTournament
        season="2023"
        competition="3"
        columns={false}
      />
    );
    expect(asFragment()).toMatchSnapshot();

    await waitForElementToBeRemoved(getByText('Placeholder'));

    expect(mockInitSettings).toHaveBeenCalledTimes(1);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(1);
    expect(mockInitComponent).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
  it('should render other competitions correctly', async () => {
    const { asFragment, getByText } = render(
      <OptaFootballFixturesTournament season="2023" competition="8" />
    );
    expect(asFragment()).toMatchSnapshot();

    await waitForElementToBeRemoved(getByText('Placeholder'));

    expect(mockInitSettings).toHaveBeenCalledTimes(1);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(1);
    expect(mockInitComponent).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
});
