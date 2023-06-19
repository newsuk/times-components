import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NewsKitProvider } from 'newskit';
import { TimesWebLightTheme } from '../../../../theme';

import { Headline } from '../headline';

describe('<Headline>', () => {
  it('should render the component', () => {
    const { baseElement } = render(
      <NewsKitProvider theme={TimesWebLightTheme}>
        <Headline headingAs="h1">Headline Text</Headline>
      </NewsKitProvider>
    );

    expect(baseElement).toMatchSnapshot();
  });
});
