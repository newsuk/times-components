import React from 'react';
import { storiesOf } from '@storybook/react';
import { InlineDialog } from './InlineDialog';
import { action } from '@storybook/addon-actions';

storiesOf('Typescript Component/InlineDialog', module).add('default', () => {
  return (
    <InlineDialog
      title="Join the conversation"
      buttonText="Subscribe Now"
      onClick={() => action('InlineDialog')('click')}
    >
      Commenting is only for subscribers. If you would like to comment, please
      sign up.
    </InlineDialog>
  );
});
