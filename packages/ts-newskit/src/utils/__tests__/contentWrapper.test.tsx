import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ContentWrapper, TCThemeProvider } from '../index';

const renderComponent = () =>
  render(
    <TCThemeProvider>
      <ContentWrapper />
    </TCThemeProvider>
  );

describe('ContentWrapper', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
