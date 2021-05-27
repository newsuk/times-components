import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PreviewNewsletterPuff } from '../PreviewNewsletterPuff';

const renderComponent = () =>
  render(
    <PreviewNewsletterPuff
      {...{
        code: 'TNL-119',

        label: 'STRAIGHT IN YOUR INBOX',
        headline: 'Politics. Explained.',
        copy:
          'Sign up to receive our brilliant Red Box newsletter, Matt Chorley`s poke at politics delivered every weekday morning at 8am.',
        imageUri:
          'https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/2aa9050e6c3d4de682f11a4802ebba96.jpg'
      }}
    />
  );

describe('Preview Newsletter Puff', () => {
  it('renders', () => {
    const component = renderComponent();
    expect(component.baseElement).toMatchSnapshot();
  });
});
