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
      text: 'Book a Stay',
    },
  };

  it('renders the button with the correct text', () => {
    render(<CtaButton {...defaultProps} />);
    const button = screen.getByText('Book a Stay');
    expect(button).toBeInTheDocument();
  });

  it('opens the correct URL when the button is clicked', () => {
    const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation();
    render(<CtaButton {...defaultProps} />);
    const button = screen.getByText('Book a Stay');
    fireEvent.click(button);
    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://www.example.com',
      '_blank'
    );
    windowOpenSpy.mockRestore();
  });

  it('renders the TimesEmbed component when ID is set', () => {
    render(<CtaButton {...defaultProps} />);
    const embedElement = screen.getByTestId('iframeEl'); // Assuming TimesEmbed uses the same ID
    expect(embedElement).toBeInTheDocument();
  });

  it('applies the correct styles to the button', () => {
    render(<CtaButton {...defaultProps} />);
    const button = screen.getByText('Book a Stay');
    expect(button).toHaveStyle('padding: 10px'); // Update this with actual styles from `ctaButtonStyles`
  });

  it('does not render a button if attributes are not provided', () => {
    const { container } = render(<CtaButton src={defaultProps.src} />);
    const button = container.querySelector('button');
    expect(button).toBeNull();
  });
});
