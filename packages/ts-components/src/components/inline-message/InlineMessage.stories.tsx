import React from 'react';
import { storiesOf } from '@storybook/react';
import { InlineMessage } from './InlineMessage';
import { boolean, select } from '@storybook/addon-knobs';
import { HiddenDiv } from '../common-styles';

storiesOf('Typescript Component/InlineMessage', module).add('default', () => {
  const type = select('Level', ['info', 'warning', 'error'], 'info');
  const realnameInlineBlueBanner = boolean(
    'realnameInlineBlueBanner feature flag',
    true
  );
  return (
    <HiddenDiv
      style={{ display: `${realnameInlineBlueBanner ? 'block' : 'none'}` }}
    >
      <InlineMessage title="Real-name comments" type={type}>
        We&apos;ve changed our policy - if you need to,{' '}
        <a href="https://home.thetimes.co.uk/">edit your screen name here</a>.
      </InlineMessage>
    </HiddenDiv>
  );
});
