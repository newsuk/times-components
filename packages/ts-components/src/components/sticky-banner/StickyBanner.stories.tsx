import React from 'react';
import { storiesOf } from '@storybook/react';

import { StickyBanner } from './StickyBanner';

storiesOf('Typescript Component/Sticky Banner', module).add(
  'Sticky Banner',
  () => {
    return (
      <StickyBanner title="Check your inbox">
        Verify your email by clicking on the link sent to your inbox.
      </StickyBanner>
    );
  }
);
