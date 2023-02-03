import React from 'react';
import { storiesOf } from '@storybook/react';

import { AccordionMenu } from './AccordionMenu';
import { NewMenu as Menu } from './Menu';

storiesOf('Newskit/AccordionMenu', module).add('AccordionMenu', () => <AccordionMenu />);
storiesOf('Newskit/Menu', module).add('Menu', () => <Menu />);
