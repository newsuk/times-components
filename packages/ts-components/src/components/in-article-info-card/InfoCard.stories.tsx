import React from 'react';
import { storiesOf } from '@storybook/react';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { InfoCard } from './InfoCard';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import previewData from '../../fixtures/preview-data/in-article-info-card';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

storiesOf('Typescript Component/In Article/Info Card', module)
  .add('Standard with Copy & Subtitle', () => (
    <TrackingContextProvider
      analyticsStream={analyticsStream}
      context={{
        component: 'ArticleSkeleton',
        attrs: {
          article_name: 'Headline',
          section_details: 'Section'
        }
      }}
    >
      <ArticleHarness>
        <FetchProvider previewData={previewData[43606]}>
          <InfoCard sectionColour="#636C17" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ))
  .add('Standard with Image', () => (
    <TrackingContextProvider
      analyticsStream={analyticsStream}
      context={{
        component: 'ArticleSkeleton',
        attrs: {
          article_name: 'Headline',
          section_details: 'Section'
        }
      }}
    >
      <ArticleHarness>
        <FetchProvider previewData={previewData[43961]}>
          <InfoCard sectionColour="#636C17" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ))
  .add('Wide with Copy', () => (
    <TrackingContextProvider
      analyticsStream={analyticsStream}
      context={{
        component: 'ArticleSkeleton',
        attrs: {
          article_name: 'Headline',
          section_details: 'Section'
        }
      }}
    >
      <ArticleHarness>
        <FetchProvider previewData={previewData[43603]}>
          <InfoCard sectionColour="#636C17" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ))
  .add('Wide with Image', () => (
    <TrackingContextProvider
      analyticsStream={analyticsStream}
      context={{
        component: 'ArticleSkeleton',
        attrs: {
          article_name: 'Headline',
          section_details: 'Section'
        }
      }}
    >
      <ArticleHarness>
        <FetchProvider previewData={previewData[43614]}>
          <InfoCard sectionColour="#636C17" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ));
