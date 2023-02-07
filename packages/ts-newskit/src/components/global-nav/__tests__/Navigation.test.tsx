import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Navigation } from '../Navigation';

describe('Navigation', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render correctly', () => {
    const { asFragment, findByText } = render(<Navigation />);

    findByText('Hello this is the navigation component');

    expect(asFragment()).toMatchSnapshot();
  });
});
