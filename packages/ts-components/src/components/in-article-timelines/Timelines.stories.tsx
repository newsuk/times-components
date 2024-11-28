import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { Timelines } from './Timelines';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { getDeckApiUrl } from '../../utils/getDeckApiUrl';

const deckApiUrl = getDeckApiUrl();

storiesOf('Typescript Component/In Article/Timelines', module)
  .add('Timelines with Bullet Point', () => (
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
      <ArticleHarness>
        <FetchProvider url={deckApiUrl + '?id=45060'}>
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
          section_details: 'section'
        }
      }}
      analyticsStream={analyticsStream}
    >
      <ArticleHarness>
        <FetchProvider url={deckApiUrl + '?id=45061'}>
          <Timelines sectionColour="#008347" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ));
