import React from 'react';

import { showcaseConverter } from '@times-components/storybook';
import NewCarousel from './NewCarousel';


const showcase = {
  children: [
    {
      component: () => (
        <NewCarousel />
      ),
      name: 'Carousel',
      type: 'story'
    },
  ],
  name: 'Typescript Component/New Carousel'
};

// @ts-ignore
showcaseConverter(module, showcase);