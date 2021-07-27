import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime';
import 'jest-styled-components';

import { OlympicsSchedule } from '../schedule/OlympicsSchedule';
import { OlympicsKeys } from '../types';

jest.mock('react-helmet-async', () => ({
  Helmet: 'Helmet',
  HelmetProvider: 'HelmetProvider'
}));

const keys: OlympicsKeys = {
  endpoint: 'https://endpoint',
  authToken: 'token',
  gamesCode: 'OG1896'
};

describe('<OlympicsSchedule>', () => {
  it('renders', () => {
    const { asFragment } = render(<OlympicsSchedule keys={keys} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders outside of article', () => {
    const { asFragment } = render(
      <OlympicsSchedule keys={keys} inArticle={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
