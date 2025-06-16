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
const mockIsNationalComp = jest.fn();
const mockReplaceTeamName = jest.fn();

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

jest.mock('../../../utils/replaceTeamDetails', () => ({
  isNationalCompetition: mockIsNationalComp,
  replaceTeamName: mockReplaceTeamName
}));

import { OptaFootballFixturesTournament } from '../OptaFootballFixturesTournament';

afterEach(() => {
  jest.clearAllMocks();
});

describe('OptaFootballFixturesTournament', () => {
  it('should render national competitions correctly', async () => {
    const { asFragment } = render(
      <OptaFootballFixturesTournament season="2023" competition="3" />
    );

    act(() => {
      mockInitComponent();
      mockReplaceTeamName();
    });

    expect(mockInitSettings).toHaveBeenCalledTimes(1);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(1);
    expect(mockInitComponent).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
  it('should render full width correctly', async () => {
    const { asFragment } = render(
      <OptaFootballFixturesTournament
        season="2023"
        competition="3"
        full_width
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render national competitions correctly with single column', async () => {
    const { asFragment } = render(
      <OptaFootballFixturesTournament
        season="2023"
        competition="3"
        columns={false}
      />
    );

    act(() => {
      mockInitComponent();
      mockReplaceTeamName();
    });

    expect(mockInitSettings).toHaveBeenCalledTimes(1);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(1);
    expect(mockInitComponent).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
  it('should render other competitions correctly', async () => {
    const { asFragment } = render(
      <OptaFootballFixturesTournament season="2023" competition="8" />
    );

    act(() => {
      mockInitComponent();
      mockReplaceTeamName();
    });

    expect(mockInitSettings).toHaveBeenCalledTimes(1);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(1);
    expect(mockInitComponent).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
});
