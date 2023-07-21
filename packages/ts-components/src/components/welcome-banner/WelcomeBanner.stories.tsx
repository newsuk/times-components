import React from 'react';
import { storiesOf } from '@storybook/react';

import { WelcomeBanner } from './WelcomeBanner';

storiesOf('Typescript Component/Welcome Banner', module).add('Welcome Banner', () => {
  return (
    <WelcomeBanner />
  );
});
