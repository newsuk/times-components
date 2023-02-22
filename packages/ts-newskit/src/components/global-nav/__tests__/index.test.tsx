import React from 'react';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom';

import { GlobalNav } from '../index';

const renderComponent = (isLoggedIn?: boolean) =>
  render(<GlobalNav isLoggedIn={isLoggedIn} />);

describe('Render GlobalNav', () => {
  it('should render the component in loggedIn state', () => {
    const { asFragment } = renderComponent(true);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component in loggedOut state', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
