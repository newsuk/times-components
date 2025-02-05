import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AffiliateLinkDisclaimer } from '../AffiliateLinkDisclaimer';
import '@testing-library/jest-dom';

describe('AffiliateLinkDisclaimer Component', () => {
  const defaultProps = {
    attributes: {
      disclaimer_text: 'This%20article%20contains%20affiliate%20links.',
      toggle_active_text: 'Show%20less',
      toggle_inactive_text: 'Show%20more',
      disclaimer_full_text:
        'Our%20travel%20journalism%20is%20written%20and%20edited%20by%20independent%20experts%20to%20inform%20and%20advise.',
    },
  };

  it('renders the disclaimer text and toggle link initially', () => {
    render(<AffiliateLinkDisclaimer attributes={defaultProps.attributes} />);

    // Check the disclaimer text
    const disclaimerText = screen.getByText(
      'This article contains affiliate links.'
    );
    expect(disclaimerText).toBeInTheDocument();

    // Check the initial toggle text
    const toggleLink = screen.getByText('Show more');
    expect(toggleLink).toBeInTheDocument();
    expect(toggleLink).toHaveAttribute('href', '#');
  });

  it('expands and collapses full text when the toggle link is clicked', () => {
    render(<AffiliateLinkDisclaimer attributes={defaultProps.attributes} />);

    const toggleLink = screen.getByText('Show more');
    const fullText = screen.getByText(
      'Our travel journalism is written and edited by independent experts to inform and advise.'
    );

    // Click to expand
    fireEvent.click(toggleLink);

    // Expect the toggle text to change to 'Show less'
    expect(screen.getByText('Show less')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByText('Show less'));

    // Expect toggle text to change back to 'Show more'
    expect(screen.getByText('Show more')).toBeInTheDocument();

    // Expect the full text container to collapse
    expect(fullText.parentElement).toHaveStyle('height: 0px');
  });

  it('decodes URI-encoded text correctly', () => {
    render(<AffiliateLinkDisclaimer attributes={defaultProps.attributes} />);

    // Check all decoded content
    expect(
      screen.getByText('This article contains affiliate links.')
    ).toBeInTheDocument();
    expect(screen.getByText('Show more')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Our travel journalism is written and edited by independent experts to inform and advise.'
      )
    ).toBeInTheDocument();
  });
});
