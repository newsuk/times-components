import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CtaButton } from '../CtaButton';

describe('CtaButton Component', () => {
  const defaultProps = {
    src: 'https%3A%2F%2Fexample.com%2Fembed',
    ratio: '16:9',
    attributes: {
      url: 'https://www.example.com',
      target: '_blank',
      text: 'Book a Stay'
    }
  };

  it('does not render a button if attributes are not provided', () => {
    const { container } = render(<CtaButton src={defaultProps.src} />);
    const button = container.querySelector('button');
    expect(button).toBeNull();
  });
});
