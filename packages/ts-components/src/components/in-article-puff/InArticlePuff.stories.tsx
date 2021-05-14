import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { InArticlePuff } from './InArticlePuff';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import { action } from '@storybook/addon-actions';

const analyticsStream = (event: any) => {
  // tslint:disable-next-line:no-console
  console.log('analytics-action', event);
  action('analytics-action')(event);
};

const showcase = {
  children: [
    {
      decorator: (storyFn: () => React.ReactNode) => (
        <TrackingContextProvider
          context={{
            articleHeadline: 'articleHeadline',
            section: 'section'
          }}
          analyticsStream={analyticsStream}
        >
          <ArticleHarness>{storyFn()}</ArticleHarness>
        </TrackingContextProvider>
      ),
      type: 'decorator'
    },
    {
      component: () => (
        <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/41548">
          <InArticlePuff sectionColour="#13354e" />
        </FetchProvider>
      ),
      name: 'In Article Puff',
      type: 'story'
    },
    {
      component: () => (
        <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/41547">
          <InArticlePuff sectionColour="#184e13" />
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
