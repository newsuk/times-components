import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { Timelines } from './Timelines';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

storiesOf('Typescript Component/In Article/Timelines', module)
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
  .add('Timelines with Bullet Point', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/45060">
      <Timelines sectionColour="#008347" />
    </FetchProvider>
  ))
  .add('Timelines with Circular Image', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/45061">
      <Timelines sectionColour="#008347" />
    </FetchProvider>
  ));
