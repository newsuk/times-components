import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import {
  WrappedGlobalNav,
  WrappedHamburger
} from '../wrapped-components/WrappedComponents';
import data from '../fixtures/data.json';

describe('WrappedComponents', () => {
  it('renders the wrapped hamburger', () => {
    const { asFragment } = render(
      <WrappedHamburger data={data} isLoggedIn={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders the wrapped GlobalNav', () => {
    const { asFragment } = render(<WrappedGlobalNav data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
