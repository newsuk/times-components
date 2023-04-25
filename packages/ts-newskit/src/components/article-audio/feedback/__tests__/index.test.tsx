import React from 'react';
import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { Feedback } from '../index';
import { screen, fireEvent } from '@testing-library/react';

describe('Feedback Component', () => {
  it('should render snapshot', () => {
    const { asFragment } = render(<Feedback />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('handleFeedback should toggle showFeedback', () => {
    render(<Feedback />);
    const thumbsUpButton = screen.getByRole('button', { name: 'Thumbs Up' });
    fireEvent.click(thumbsUpButton);
    expect(
      screen.getByText(
        "Thank you for your feedback. We're always trying to give you the best possible experience – your feedback helps us do this."
      )
    ).toBeInTheDocument();
  });

  it('handleFeedback should toggle showFeedback', () => {
    render(<Feedback />);
    const thumbsUpButton = screen.getByRole('button', { name: 'Thumbs Down' });
    fireEvent.click(thumbsUpButton);
    expect(
      screen.getByText(
        "Thank you for your feedback. We're always trying to give you the best possible experience – your feedback helps us do this."
      )
    ).toBeInTheDocument();
  });
  it('handleFeedback should close showFeedback', async () => {
    render(<Feedback />);
    const test = screen.getByText(
      'Want to listen to more articles? Give your feedback below or email'
    );
    const closeButton = screen.getByRole('button', { name: 'Feedback Close' });
    fireEvent.click(closeButton);
    expect(test).not.toBeInTheDocument();
  });

  it('handleFeedback should close thank you message', async () => {
    render(<Feedback />);
    const thumbsUpButton = screen.getByRole('button', { name: 'Thumbs Down' });
    fireEvent.click(thumbsUpButton);
    const test = screen.getByText(
      "Thank you for your feedback. We're always trying to give you the best possible experience – your feedback helps us do this."
    );
    const closeButton = screen.getByRole('button', { name: 'Thank you Close' });
    fireEvent.click(closeButton);
    expect(test).not.toBeInTheDocument();
  });
});
