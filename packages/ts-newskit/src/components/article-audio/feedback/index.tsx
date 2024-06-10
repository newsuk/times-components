import React, { useState } from 'react';
import { Block } from 'newskit';
import { FeedbackText } from './feedback';
import { Message } from './message';

export interface FeedbackProps {
  feedbackMessage: string;
  message: string;
}

export const Feedback = ({ feedbackMessage, message }: FeedbackProps) => {
  const [closed, setClosed] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(true);

  const handleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <>
      {!closed && (
        <>
          <Block
            stylePreset="feedbackContainerPreset"
            paddingInline="space040"
            paddingBlock="space040"
          >
            {showFeedback ? (
              <FeedbackText
                handleFeedback={handleFeedback}
                closed={closed}
                setClosed={setClosed}
                showFeedback={showFeedback}
                feedbackMessage={feedbackMessage}
              />
            ) : (
              <Message
                setClosed={setClosed}
                closed={closed}
                message={message}
              />
            )}
          </Block>
        </>
      )}
    </>
  );
};
