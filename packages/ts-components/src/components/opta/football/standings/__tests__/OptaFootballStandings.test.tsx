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

import { OptaFootballStandings } from '../OptaFootballStandings';

const requiredProps = {
  season: '2020',
  competition: '3'
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('OptaFootballStandings', () => {
  it('should render correctly', async () => {
    const { asFragment } = render(<OptaFootballStandings {...requiredProps} />);
    act(() => {
      mockInitComponent();
      mockReplaceTeamName();
    });

    expect(mockInitSettings).toHaveBeenCalledTimes(1);
    expect(mockInitStyleSheet).toHaveBeenCalledTimes(1);
    expect(mockInitComponent).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly, with columns', async () => {
    const { asFragment } = render(
      <OptaFootballStandings columns {...requiredProps} />
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
