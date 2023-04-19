import React from 'react';
import { PersonalStats } from '../index';
import { personalStatsItems } from '../fixtures/personalStats.json';
import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';

describe('PersonalStats', () => {
  it('should render PersonalStats component', () => {
    const { asFragment } = render(<PersonalStats data={personalStatsItems} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
