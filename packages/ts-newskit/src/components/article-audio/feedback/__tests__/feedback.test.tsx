import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { FeedbackText } from '../feedback';
import { screen } from '@testing-library/react';

const handleFeedback = jest.fn();
const setClosed = jest.fn();

const feedbackMessage =
  'Want to listen to more articles? Give your feedback below or email';

describe('FeedbackText Component', () => {
  it('should render snapshot', () => {
    const { asFragment } = render(
      <FeedbackText
        handleFeedback={handleFeedback}
        closed={false}
        setClosed={setClosed}
        showFeedback={true}
        feedbackMessage={feedbackMessage}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render FeedbackText', () => {
    render(
      <FeedbackText
        handleFeedback={handleFeedback}
        closed={false}
        setClosed={setClosed}
        showFeedback={true}
        feedbackMessage={feedbackMessage}
      />
    );
    expect(screen.getByText(feedbackMessage)).toBeInTheDocument();
  });
});
