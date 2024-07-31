import React from 'react';
import { storiesOf } from '@storybook/react';

import { WelcomeBanner1 } from './WelcomeBanner1';

storiesOf('Typescript Component/Welcome Banner', module).add(
  'Welcome Banner',
  () => {
    window.sessionStorage.setItem('showWelcomeBanner', 'true');
    return <WelcomeBanner1 />;
  }
);
