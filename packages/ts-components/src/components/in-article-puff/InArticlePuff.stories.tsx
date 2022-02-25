import React from 'react';
import { storiesOf } from '@storybook/react';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { InArticlePuff } from './InArticlePuff';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import previewData from '../../fixtures/preview-data/in-article-puff';
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
    <FetchProvider previewData={previewData[41548]}>
      <InArticlePuff sectionColour="#13354e" />
    </FetchProvider>
  ))
  .add('Image 3:2', () => (
    <FetchProvider previewData={previewData[41548]}>
      <InArticlePuff
        sectionColour="#13354e"
        forceImageAspectRatio="3:2"
        isLiveOrBreakingFlag="breaking"
      />
    </FetchProvider>
  ))
  .add('No Image', () => (
    <FetchProvider previewData={previewData[41547]}>
      <InArticlePuff sectionColour="#184e13" isLiveOrBreakingFlag="live" />
    </FetchProvider>
  ));
