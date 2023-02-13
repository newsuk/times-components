import React from 'react';
import { render } from '@testing-library/react';

import GlobalNav from "../index";

describe
it('renders horizontally', () => {
    const fragment = render(
      <GlobalNav />
    );
    expect(fragment).toMatchSnapshot();
});