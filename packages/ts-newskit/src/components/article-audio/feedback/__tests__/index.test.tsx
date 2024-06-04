import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { Feedback } from '../index';
import { screen, fireEvent } from '@testing-library/react';

const feedbackMessage =
  'Want to listen to more articles? Give your feedback below or email';

const message =
  "Thank you for your feedback. We're always trying to give you the best possible experience – your feedback helps us do this.";

describe('Feedback Component', () => {
  it('should render snapshot', () => {
    const { asFragment } = render(
      <Feedback feedbackMessage={feedbackMessage} message={message} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('handleFeedback should toggle showFeedback', () => {
    render(<Feedback feedbackMessage={feedbackMessage} message={message} />);
    const thumbsUpButton = screen.getByRole('button', { name: 'Thumbs Up' });
    fireEvent.click(thumbsUpButton);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('handleFeedback should toggle showFeedback', () => {
    render(<Feedback feedbackMessage={feedbackMessage} message={message} />);
    const thumbsUpButton = screen.getByRole('button', { name: 'Thumbs Down' });
    fireEvent.click(thumbsUpButton);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
  it('handleFeedback should close showFeedback', async () => {
    render(<Feedback feedbackMessage={feedbackMessage} message={message} />);
    const test = screen.getByText(feedbackMessage);
    const closeButton = screen.getByRole('button', { name: 'close' });
    fireEvent.click(closeButton);
    expect(test).not.toBeInTheDocument();
  });

  it('handleFeedback should close thank you message', async () => {
    render(<Feedback feedbackMessage={feedbackMessage} message={message} />);
    const thumbsUpButton = screen.getByRole('button', { name: 'Thumbs Down' });
    fireEvent.click(thumbsUpButton);
    const test = screen.getByText(message);
    const closeButton = screen.getByRole('button', { name: 'close' });
    fireEvent.click(closeButton);
    expect(test).not.toBeInTheDocument();
  });
});
