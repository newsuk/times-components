import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import HamburgerMenu from '../HamburgerMenu';

describe('HamburgerMenu Logged In', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render correctly', () => {
    const { asFragment } = render(<HamburgerMenu loggedIn={true}/>);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('HamburgerMenu Logged Out', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render correctly', () => {
    const { asFragment } = render(<HamburgerMenu loggedIn={false}/>);

    expect(asFragment()).toMatchSnapshot();
  });
});