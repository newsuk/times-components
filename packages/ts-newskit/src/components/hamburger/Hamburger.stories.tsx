// @ts-nocheck
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { NewsKitCloseIcon } from './icons';

import { NewMenu as Menu } from './Menu';

storiesOf('Newskit/Menu', module)
.add('Menu', () => {  
  return <Menu loggedIn={boolean('Is logged in', false)}/>
})
