import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { OlympicsSchedule } from '../schedule/OlympicsSchedule';
import { OlympicsKeys } from '../types';

jest.mock('react-helmet-async', () => ({
  Helmet: 'Helmet'
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
});
