import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { Timelines } from './Timelines';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

storiesOf('Typescript Component/In Article/Timelines', module)
  .add('Timelines with Bullet Point', () => (
    <TrackingContextProvider
      context={{
        component: 'ArticleSkeleton',
        attrs: {
          article_name: 'articleHeadline',
          section_details: 'section',
        },
      }}
      analyticsStream={analyticsStream}
    >
      <ArticleHarness>
        <FetchProvider url="https://editorial-tm.newsapis.co.uk/prod/deck-component-data-api?id=45060">
          <Timelines sectionColour="#008347" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ))
  .add('Timelines with Circular Image', () => (
    <TrackingContextProvider
      context={{
        component: 'ArticleSkeleton',
        attrs: {
          article_name: 'articleHeadline',
          section_details: 'section',
        },
      }}
      analyticsStream={analyticsStream}
    >
      <ArticleHarness>
        <FetchProvider url="https://editorial-tm.newsapis.co.uk/prod/deck-component-data-api?id=45061">
          <Timelines sectionColour="#008347" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ));
