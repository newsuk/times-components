// __tests__/StickyNote.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StickyNote from '../StickyNote';

describe('StickyNote component', () => {
  const defaultProps = {
    title: 'Test Title',
    copy: 'This is some test content.',
    position: { top: 100, left: 50 },
    pointerLeftOffset: 25
  };

  it('renders correctly with required props', () => {
    render(<StickyNote {...defaultProps} />);

    // Check for title
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    // Check for content
    expect(screen.getByText('This is some test content.')).toBeInTheDocument();
  });

  it('renders beta flag when betaFlag is true', () => {
    render(<StickyNote {...defaultProps} betaFlag={true} />);

    // Check for Beta label
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('renders feedbackLink when provided', () => {
    render(
      <StickyNote {...defaultProps} feedbackLink="feedback@example.com" />
    );

    // Check for feedback email link
    const feedbackLink = screen.getByText('feedback@example.com');
    expect(feedbackLink).toBeInTheDocument();
    expect(feedbackLink).toHaveAttribute('href', 'mailto:feedback@example.com');
  });

  it('renders LearnMoreLink when provided', () => {
    render(
      <StickyNote
        {...defaultProps}
        LearnMoreLink="https://example.com/learn-more"
      />
    );

    // Check for learn more link
    const learnMoreLink = screen.getByText('Learn more');
    expect(learnMoreLink).toBeInTheDocument();
    expect(learnMoreLink).toHaveAttribute(
      'href',
      'https://example.com/learn-more'
    );
  });

  it('renders pointer at the correct offset', () => {
    render(<StickyNote {...defaultProps} pointerLeftOffset={30} />);

    const pointer = screen.getByTestId('sticky-note-pointer');
    expect(pointer).toHaveStyle('left: 15px'); // 30 - 15 = 15
  });

  it('hides the sticky note when the close button is clicked', () => {
    render(<StickyNote {...defaultProps} />);

    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    // Sticky note should be removed from the DOM
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('sets a cookie when closed if cookieValue is provided', () => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: ''
    });

    render(<StickyNote {...defaultProps} cookieValue="stickyClosed" />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    // Verify that cookie is set
    expect(document.cookie).toContain('stickyClosed=true');
  });

  it('does not render when visibility is toggled off', () => {
    const { rerender } = render(<StickyNote {...defaultProps} />);

    // Initially visible
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    // Manually toggle visibility off
    rerender(<StickyNote {...defaultProps} cookieValue="stickyClosed" />);
    fireEvent.click(screen.getByRole('button'));

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });
});
