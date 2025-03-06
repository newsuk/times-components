import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PreviewNewsletterPuff } from '../PreviewNewsletterPuff';

const renderComponent = () =>
  render(
    <PreviewNewsletterPuff
      {...{
        code: 'TNL-119',
        section: 'news',
        headline: 'Politics. Explained.',
        copy:
          'Sign up to receive our brilliant Red Box newsletter, Matt Chorley`s poke at politics delivered every weekday morning at 8am.'
      }}
    />
  );

describe('Preview Newsletter Puff', () => {
  it('renders', () => {
    const component = renderComponent();
    expect(component.baseElement).toMatchSnapshot();
  });
});
