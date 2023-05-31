import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { GridOverlay, TCThemeProvider } from '../index';
export interface ShowProp {
  show?: boolean;
}

const renderComponent = ({ show }: ShowProp) =>
  render(
    <TCThemeProvider>
      <GridOverlay show={show} />
    </TCThemeProvider>
  );

describe('GridOverlay', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderComponent({ show: true });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should match snapshot', () => {
    const { asFragment } = renderComponent({ show: false });
    expect(asFragment()).toMatchSnapshot();
  });
});
