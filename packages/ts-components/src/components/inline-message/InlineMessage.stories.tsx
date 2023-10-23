import React from 'react';
import { storiesOf } from '@storybook/react';
import { InlineMessage } from './InlineMessage';
import { select } from '@storybook/addon-knobs';
import { HOME_URL } from '../../constants';

storiesOf('Typescript Component/InlineMessage', module).add('default', () => {
  const type = select('Level', ['info', 'warning', 'error'], 'info');
  return (
    <InlineMessage title="Real-name comments" type={type}>
      Our policy is now for commenters to use real names. You may{' '}
      <a href={`${HOME_URL}/`}>edit your screen name here</a>.
    </InlineMessage>
  );
});
