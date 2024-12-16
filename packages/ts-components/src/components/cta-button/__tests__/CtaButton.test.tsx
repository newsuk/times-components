import React from 'react';
import { render } from '@testing-library/react';
import { CtaButton } from '../CtaButton';

describe('CtaButton Component', () => {
  const defaultProps = {
    url: 'https://www.example.com',
    target: '_blank',
    text: 'Book a Stay'
  };

  it('does not render a button if attributes are not provided', () => {
    const { container } = render(<CtaButton attributes={defaultProps} />);
    const button = container.querySelector('button');
    expect(button).toBeNull();
  });
});
