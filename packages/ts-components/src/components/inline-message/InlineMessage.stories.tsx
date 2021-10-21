import React from 'react';
import { storiesOf } from '@storybook/react';
import { InlineMessage } from './InlineMessage';
import { select } from '@storybook/addon-knobs';

storiesOf('Typescript Component/InlineMessage', module).add('default', () => {
  const type = select('Level', ['info', 'warning', 'error'], 'info');
  return (
    <InlineMessage title="Real-name commenting" type={type}>
      Digital commenters are now identified by their real name. We believe this
      is the best way to ensure high-quality reader participation and
      intelligent debate.
    </InlineMessage>
  );
});
