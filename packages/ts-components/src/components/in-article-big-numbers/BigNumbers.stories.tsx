import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { BigNumbers } from './BigNumbers';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { getDeckApiUrl } from '../../utils/getDeckApiUrl';

const deckApiUrl = getDeckApiUrl();

storiesOf('Typescript Component/In Article/Big Numbers', module)
  .add('Standard without a headline', () => (
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
        <FetchProvider url={deckApiUrl + '?id=44335'}>
          <BigNumbers sectionColour="#636C17" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ))
  .add('Standard with One Card', () => (
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
        <FetchProvider url={deckApiUrl + '?id=44336'}>
          <BigNumbers sectionColour="#636C17" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ))
  .add('Wide with a headline', () => (
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
        <FetchProvider url={deckApiUrl + '?id=44334'}>
          <BigNumbers sectionColour="#636C17" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ));
