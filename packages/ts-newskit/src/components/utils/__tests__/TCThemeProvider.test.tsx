import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SectionHeader } from '../../section-header';
import { TCThemeProvider } from '../index';

const renderComponent = () =>
  render(
    <TCThemeProvider>
      <SectionHeader title="test" />
    </TCThemeProvider>
  );

describe('<TCThemeProvider>', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should wrap child components with theme and pass styling', () => {
    renderComponent();

    const title = screen.getByText('test');

    expect(title).toHaveStyle({
      font: 'inherit',
      display: 'inline',
      margin: '0'
    });
  });
});
