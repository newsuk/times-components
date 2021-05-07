import React from 'react';

import { showcaseConverter } from '@times-components/storybook';
import { InArticlePuff } from './InArticlePuff';
import { FetchProvider } from '../fetch/FetchProvider';

const showcase = {
  children: [
    {
      component: () => (
        <FetchProvider
          url={'https://gobble.timesdev.tools/deck/api/deck-post-action/41548'}
        >
          <InArticlePuff />
        </FetchProvider>
      ),
      name: 'In Article Puff',
      type: 'story'
    },
    {
      component: () => (
        <FetchProvider
          url={'https://gobble.timesdev.tools/deck/api/deck-post-action/41547'}
        >
          <InArticlePuff />
        </FetchProvider>
      ),
      name: 'In Article Puff - No Image',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article Puff'
};

// @ts-ignore
showcaseConverter(module, showcase);
