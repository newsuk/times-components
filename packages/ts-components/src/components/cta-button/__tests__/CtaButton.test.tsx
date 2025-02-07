import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CtaButton } from '../CtaButton';
import { tealiumTrackingHandler } from '../../../helpers/tracking/TrackingHandler';

jest.mock('../../../helpers/tracking/TrackingHandler', () => ({
  tealiumTrackingHandler: jest.fn()
}));

describe('CtaButton Component', () => {
  const defaultProps = {
    url: 'https://www.example.com',
    target: '_blank',
    text: 'Book a Stay'
  };

  it('calls tealiumTrackingHandler on link click', () => {
    const { getByText } = render(<CtaButton attributes={defaultProps} />);
    const link = getByText('Book a Stay');

    fireEvent.click(link);

    expect(tealiumTrackingHandler).toHaveBeenCalledWith(
      'affiliate cta clicked',
      'navigation',
      'click',
      "https://www.example.com", 
      "book a stay"
    );
  });

  it('does not render anything if attributes are not provided', () => {
    const { container } = render(<CtaButton />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render anything if text is empty or contains only whitespace', () => {
    const { container: emptyTextContainer } = render(
      <CtaButton attributes={{ ...defaultProps, text: '' }} />
    );
    expect(emptyTextContainer.firstChild).toBeNull();

    const { container: whitespaceTextContainer } = render(
      <CtaButton attributes={{ ...defaultProps, text: '   ' }} />
    );
    expect(whitespaceTextContainer.firstChild).toBeNull();
  });

  it('does not render anything if url is missing or empty', () => {
    const { container: noUrlContainer } = render(
      <CtaButton attributes={{ ...defaultProps, url: '' }} />
    );
    expect(noUrlContainer.firstChild).toBeNull();
  });
});
