import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <>Placeholder</>
}));

const mockInitSettings = jest.fn();
const mockInitStyleSheet = jest.fn();
const mockInitComponent = jest.fn();
const mockIsNationalComp = jest.fn();
const mockUseFixturePageLink = jest.fn();
const mockUseUpdateNationalTeamDetails = jest.fn();

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
jest.mock('../../../utils/replaceNationalTeamDetails', () => ({
  isNationalCompetition: mockIsNationalComp
}));
jest.mock('../../../utils/useFixturePageLink', () => ({
  useFixturePageLink: mockUseFixturePageLink
}));
jest.mock('../../../utils/useUpdateNationalTeamDetails', () => ({
  useUpdateNationalTeamDetails: mockUseUpdateNationalTeamDetails
}));

import { OptaFootballFixturesTicker } from '../OptaFootballFixturesTicker';
import { isNationalCompetition } from '../../../utils/replaceNationalTeamDetails';

const requiredProps = {
  season: '2020',
  competition: '8',
  date_from: '2021-06-20',
  date_to: '2021-07-11'
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('OptaFootballFixturesTicker with flags', () => {
  it('should render correctly', async () => {
    const { asFragment, getByText } = render(
      <OptaFootballFixturesTicker {...requiredProps} />
    );
    expect(asFragment()).toMatchSnapshot();

    await waitForElementToBeRemoved(getByText('Placeholder'));

    expect(mockInitSettings).toHaveBeenCalled();
    expect(mockInitStyleSheet).toHaveBeenCalled();
    expect(mockInitComponent).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('OptaFootballFixturesTicker without flags', () => {
  afterAll(() => {
    jest.clearAllTimers();
  });

  it('should render correctly', async () => {
    (isNationalCompetition as jest.Mock).mockReturnValue(true);

    const { asFragment, getByText } = render(
      <OptaFootballFixturesTicker season="2023" competition="3" />
    );
    expect(asFragment()).toMatchSnapshot();

    await waitForElementToBeRemoved(getByText('Placeholder'));

    expect(mockInitSettings).toHaveBeenCalled();
    expect(mockInitStyleSheet).toHaveBeenCalled();
    expect(mockInitComponent).toHaveBeenCalled();
    expect(mockUseUpdateNationalTeamDetails).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with isApp property', async () => {
    (isNationalCompetition as jest.Mock).mockReturnValue(true);

    const { asFragment, getByText } = render(
      <OptaFootballFixturesTicker season="2023" competition="3" isApp={true} />
    );
    expect(asFragment()).toMatchSnapshot();

    await waitForElementToBeRemoved(getByText('Placeholder'));

    expect(mockInitSettings).toHaveBeenCalled();
    expect(mockInitStyleSheet).toHaveBeenCalled();
    expect(mockInitComponent).toHaveBeenCalled();
    expect(mockUseUpdateNationalTeamDetails).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with fixturesPageUrl, isDarkMode properties', async () => {
    (isNationalCompetition as jest.Mock).mockReturnValue(true);

    const { asFragment, getByText } = render(
      <OptaFootballFixturesTicker season="2023" competition="3" isDarkMode={true} fixturesPageUrl={'https://www.thetimes.co.uk/sport/football/euro-2024'} />
    );
    expect(asFragment()).toMatchSnapshot();

    await waitForElementToBeRemoved(getByText('Placeholder'));

    expect(mockInitSettings).toHaveBeenCalled();
    expect(mockInitStyleSheet).toHaveBeenCalled();
    expect(mockInitComponent).toHaveBeenCalled();
    expect(mockUseFixturePageLink).toHaveBeenCalled();
    expect(mockUseUpdateNationalTeamDetails).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });
});
