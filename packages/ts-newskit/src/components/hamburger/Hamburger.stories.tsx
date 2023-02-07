// @ts-nocheck
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import { NewMenu as Menu } from './Menu';

storiesOf('Newskit/Hamburger', module)
.add('Hamburger', () => {  
  return <Menu loggedIn={boolean('Is logged in', false)}/>
})