import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { WelcomeBanner1 } from '../WelcomeBanner1';

describe('WelcomeBanner', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the component if session storage token showWelcomeBanner is set to true', () => {
    window.sessionStorage.setItem('showWelcomeBanner', 'true');
    const { getByText } = render(<WelcomeBanner1 />);
    expect(getByText('Welcome to The Times and The Sunday Times'));
    expect(getByText('We hope you enjoy your free content'));
  });

  it('should not render the component if the session storage token showWelcomeBanner does not exist', () => {
    const { queryByTestId } = render(<WelcomeBanner1 />);
    expect(queryByTestId('title')).toBeFalsy();
    expect(queryByTestId('text')).toBeFalsy();
  });

  it('should remove the showWelcomeBanner session storage token when the component is displayed', () => {
    window.sessionStorage.setItem('showWelcomeBanner', 'true');
    render(<WelcomeBanner1 />);
    expect(window.sessionStorage.getItem('showWelcomeBanner')).toBeFalsy();
  });
});
