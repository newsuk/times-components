import React from 'react';
import { storiesOf } from '@storybook/react';
import { InlineMessage } from './InlineMessage';
import { select } from '@storybook/addon-knobs';

storiesOf('Typescript Component/InlineMessage', module).add('default', () => {
  const type = select('Level', ['info', 'warning', 'error'], 'info');
  return (
    <InlineMessage title="Real-name comments" type={type}>
      Our policy is now for commenters to use real names. You may{' '}
      <a href="https://home.thetimes.co.uk/">edit your screen name here</a>.
    </InlineMessage>
  );
});
