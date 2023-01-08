import React from 'react';
import { storiesOf } from '@storybook/react';
import { getArticles } from './helpers';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import previewData from '../../fixtures/preview-data/recommended-articles';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { RecommendedArticles } from './RecommendedArticles';

storiesOf('Typescript Component/Recommended Articles', module)
  .add('Recommended Articles - 1 Article', () => (
    <TrackingContextProvider
      context={{
        component: 'ArticleSkeleton',
        object: 'RecommendedArticles',
        attrs: {
          event_navigation_action: 'navigation',
          event_navigation_name: 'widget:relevant article',
          event_navigation_browsing_method: 'click',
          section_details: 'section : <section>',
          article_name: '<headline>',
          widget_headline: '<headline>',
          widget_section: '<section>',
          widget_type: "today's section"
        }
      }}
      analyticsStream={analyticsStream}
    >
      <FetchProvider previewData={getArticles(previewData, 1)}>
        <RecommendedArticles heading="Today's News" />
      </FetchProvider>
    </TrackingContextProvider>
  ))
  .add('Recommended Articles - 2 Article', () => (
    <TrackingContextProvider
      context={{
        component: 'ArticleSkeleton',
        object: 'RecommendedArticles',
        attrs: {
          event_navigation_action: 'navigation',
          event_navigation_name: 'widget:relevant article',
          event_navigation_browsing_method: 'click',
          section_details: 'section : <section>',
          article_name: '<headline>',
          widget_headline: '<headline>',
          widget_section: '<section>',
          widget_type: "today's section"
        }
      }}
      analyticsStream={analyticsStream}
    >
      <FetchProvider previewData={getArticles(previewData, 2)}>
        <RecommendedArticles heading="Today's Business" />
      </FetchProvider>
    </TrackingContextProvider>
  ))
  .add('Recommended Articles - 3 Article', () => (
    <TrackingContextProvider
      context={{
        component: 'ArticleSkeleton',
        object: 'RecommendedArticles',
        attrs: {
          event_navigation_action: 'navigation',
          event_navigation_name: 'widget:relevant article',
          event_navigation_browsing_method: 'click',
          section_details: 'section : <section>',
          article_name: '<headline>',
          widget_headline: '<headline>',
          widget_section: '<section>',
          widget_type: "today's section"
        }
      }}
      analyticsStream={analyticsStream}
    >
      <FetchProvider previewData={previewData}>
        <RecommendedArticles heading="Today's Sport" />
      </FetchProvider>
    </TrackingContextProvider>
  ));
