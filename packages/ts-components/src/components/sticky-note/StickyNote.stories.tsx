import React from 'react';
import { storiesOf } from '@storybook/react';
import { StickyNote } from './StickyNote';

storiesOf('Typescript Component/Sticky Note', module).add('Sticky Note', () => {
  return (
    <div style={{ padding: '10px' }}>
      <StickyNote
        title="Listen to articles"
        betaFlag={true}
        copy="You can now listen to articles. Let us know your feedback"
        feedbackLink="userfeedback@the-times.co.uk"
        LearnMoreLink="#"
      />
    </div>
  );
});
