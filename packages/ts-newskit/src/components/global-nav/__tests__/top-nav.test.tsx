import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TopNav } from '../top-nav';

describe('Navigation', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render correctly', () => {
    const { asFragment, findByText } = render(<TopNav />);

    findByText('Hello this is the navigation component');

    expect(asFragment()).toMatchSnapshot();
  });
});
