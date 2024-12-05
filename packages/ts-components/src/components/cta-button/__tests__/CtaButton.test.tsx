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

  it('opens the correct URL when the button is clicked', () => {
    const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation();
    render(<CtaButton {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Book a Stay/i });
    fireEvent.click(button);
    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://www.example.com',
      '_blank'
    );
    windowOpenSpy.mockRestore();
  });

  it('does not render a button if attributes are not provided', () => {
    const { container } = render(<CtaButton src={defaultProps.src} />);
    const button = container.querySelector('button');
    expect(button).toBeNull();
  });
});
