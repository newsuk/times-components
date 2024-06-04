import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Headline } from 'newskit';
import { TCThemeProvider } from '../index';

const renderComponent = () =>
  render(
    <TCThemeProvider>
      <Headline
        headingAs="h1"
        overrides={{
          marginBlockStart: { md: 'space070' },
          marginBlockEnd: { xs: 'space030', md: 'space045' },
          typographyPreset: {
            xs: 'sectionHeader010',
            md: 'editorialDisplay008'
          }
        }}
      >
        test
      </Headline>
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
