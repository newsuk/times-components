import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <>Placeholder</>
}));

const mockInitSettings = jest.fn();
const mockInitStyleSheet = jest.fn();
const mockInitComponent = jest.fn();
const mockReplaceTeamName = jest.fn();
const mockIsNationalComp = jest.fn();
const mockUseFixturePageLink = jest.fn();

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
jest.mock('../../../utils/useFixturePageLink', () => ({
  useFixturePageLink: mockUseFixturePageLink
}));

import { OptaFixturesTicker } from '../OptaFixturesTicker';
import { isNationalCompetition } from '../../../utils/replaceTeamDetails';

const requiredProps = {
  season: '2020',
  competition: '8',
  date_from: '2021-06-20',
  date_to: '2021-07-11'
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('OptaFixturesTicker rugby', () => {
  it('should render correctly', async () => {
    const { asFragment } = render(
      <OptaFixturesTicker
        {...requiredProps}
        sport="rugby"
        season="2024"
        competition="209"
      />
    );
    act(() => {
      mockInitComponent();
      mockReplaceTeamName();
    });

    expect(mockInitSettings).toHaveBeenCalled();
    expect(mockInitStyleSheet).toHaveBeenCalled();
    expect(mockInitComponent).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('OptaFixturesTicker with flags', () => {
  it('should render correctly', async () => {
    const { asFragment } = render(
      <OptaFixturesTicker sport="football" {...requiredProps} />
    );
    act(() => {
      mockInitComponent();
      mockReplaceTeamName();
    });

    expect(mockInitSettings).toHaveBeenCalled();
    expect(mockInitStyleSheet).toHaveBeenCalled();
    expect(mockInitComponent).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('OptaFixturesTicker without flags', () => {
  afterAll(() => {
    jest.clearAllTimers();
  });

  it('should render correctly', async () => {
    (isNationalCompetition as jest.Mock).mockReturnValue(true);

    const { asFragment } = render(
      <OptaFixturesTicker sport="football" season="2023" competition="3" />
    );
    act(() => {
      mockInitComponent();
      mockReplaceTeamName();
    });

    expect(mockInitSettings).toHaveBeenCalled();
    expect(mockInitStyleSheet).toHaveBeenCalled();
    expect(mockInitComponent).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with isApp property', async () => {
    (isNationalCompetition as jest.Mock).mockReturnValue(true);

    const { asFragment } = render(
      <OptaFixturesTicker
        sport="football"
        season="2023"
        competition="3"
        isApp={true}
      />
    );
    act(() => {
      mockInitComponent();
      mockReplaceTeamName();
    });

    expect(mockInitSettings).toHaveBeenCalled();
    expect(mockInitStyleSheet).toHaveBeenCalled();
    expect(mockInitComponent).toHaveBeenCalled();
    expect(mockUseFixturePageLink).not.toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with fixturesPageUrl', async () => {
    (isNationalCompetition as jest.Mock).mockReturnValue(true);

    const { asFragment } = render(
      <OptaFixturesTicker
        sport="football"
        season="2023"
        competition="3"
        fixturesPageUrl={'https://www.thetimes.co.uk/sport/football/euro-2024'}
      />
    );
    act(() => {
      mockInitComponent();
      mockReplaceTeamName();
    });

    expect(mockInitSettings).toHaveBeenCalled();
    expect(mockInitStyleSheet).toHaveBeenCalled();
    expect(mockInitComponent).toHaveBeenCalled();
    expect(mockUseFixturePageLink).toHaveBeenCalled();

    expect(asFragment()).toMatchSnapshot();
  });
});
