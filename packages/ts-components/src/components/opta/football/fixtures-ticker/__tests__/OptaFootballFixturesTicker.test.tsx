import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <>Placeholder</>
}));

const mockInitSettings = jest.fn();
const mockInitStyleSheet = jest.fn();
const mockInitComponent = jest.fn();
const mockReplaceFlags = jest.fn();

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
jest.mock('../../../utils/replaceFlags', () => ({
  replaceFlags: mockReplaceFlags
}));

import { OptaFootballFixturesTicker } from '../OptaFootballFixturesTicker';

const requiredProps = {
  season: '2020',
  competition: '8',
  date_from: '2021-06-20',
  date_to: '2021-07-11'
};

describe('OptaFootballFixturesTicker with flags', () => {
  it('should render correctly', async () => {
    const { asFragment, getByText } = render(
      <OptaFootballFixturesTicker {...requiredProps} />
    );
    expect(asFragment()).toMatchSnapshot();

    await waitForElementToBeRemoved(getByText('Placeholder'));

    expect(mockInitSettings).toHaveBeenCalledTimes(2);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(2);
    expect(mockInitComponent).toHaveBeenCalledTimes(2);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('OptaFootballFixturesTicker without flags', () => {
  afterAll(() => {
    jest.clearAllTimers();
  });

  it('should render correctly', async () => {
    React.useState = jest.fn().mockReturnValue([true, () => React.useState]);
    React.useState = jest
      .fn()
      .mockReturnValue([document.createElement('div'), () => React.useState]);

    const { asFragment } = render(
      <OptaFootballFixturesTicker season="2023" competition="3" />
    );
    expect(asFragment()).toMatchSnapshot();

    expect(mockInitSettings).toHaveBeenCalled();
    expect(mockInitStyleSheet).toHaveBeenCalled();
    expect(mockInitComponent).toHaveBeenCalled();
    expect(mockReplaceFlags).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });
});
