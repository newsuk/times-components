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
      'book a stay',
      'navigation',
      'click'
    );
  });

  it('does not render anything if attributes are not provided', () => {
    const { container } = render(<CtaButton />);
    expect(container.firstChild).toBeNull();
  });
});
