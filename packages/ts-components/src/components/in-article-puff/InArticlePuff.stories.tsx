import React from 'react';
import { storiesOf } from '@storybook/react';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { InArticlePuff } from './InArticlePuff';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

storiesOf('Typescript Component/In Article/In Article Puff', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <TrackingContextProvider
      context={{
        component: 'ArticleSkeleton',
        attrs: {
          article_name: 'articleHeadline',
          section_details: 'section'
        }
      }}
      analyticsStream={analyticsStream}
    >
      <ArticleHarness>{storyFn()}</ArticleHarness>
    </TrackingContextProvider>
  ))

  .add('Image', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/41548">
      <InArticlePuff sectionColour="#13354e" />
    </FetchProvider>
  ))
  .add('Image 3:2', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/41548">
      <InArticlePuff sectionColour="#13354e" forceImageAspectRatio="3:2" />
    </FetchProvider>
  ))
  .add('No Image', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/41547">
      <InArticlePuff sectionColour="#184e13" />
    </FetchProvider>
  ))
  .add('Sanitised', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/41547">
      <InArticlePuff sectionColour="#184e13" />
    </FetchProvider>
  ));
