import React from 'react';
import { render } from '../../../../utils/test-utils';
import { archivedGames } from '../fixtures/data.json';
import '@testing-library/jest-dom';

import { DateCard } from '../index';

describe('Date Card', () => {
  it('should render puzzles Date Card', () => {
    const { asFragment } = render(
      <DateCard sectionColour={'#333'} data={archivedGames[0].games[1]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
