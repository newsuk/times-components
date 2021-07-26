import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime';
import 'jest-styled-components';
import { OlympicsMedalTable } from '../medal-table/OlympicsMedalTable';
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

describe('<OlympicsMedalTable>', () => {
  it('renders', () => {
    const { asFragment } = render(<OlympicsMedalTable keys={keys} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders outside of article', () => {
    const { asFragment } = render(
      <OlympicsMedalTable keys={keys} inArticle={false} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('click show all', async () => {
    const { asFragment, getByText, findByText } = render(
      <OlympicsMedalTable
        keys={keys}
        highlighted="AND"
        sectionColor="sectionColor"
      />
    );
    fireEvent.click(getByText('Show All'));
    await findByText('Collapse');

    expect(asFragment()).toMatchSnapshot();
  });
});
