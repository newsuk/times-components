import React from 'react';
import { storiesOf } from '@storybook/react';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import previewData from '../../fixtures/preview-data/recommended-articles';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { CategorisedArticles } from './CategorisedArticles';

storiesOf('Typescript Component/Categorised Articles', module).add(
  'Categorised Articles - 1 Article',
  () => (
    <TrackingContextProvider
      context={{
        component: 'ArticleSkeleton',
        object: 'CategorisedArticles',
        attrs: {
          event_navigation_action: 'navigation',
          event_navigation_name: 'widget:relevant article',
          event_navigation_browsing_method: 'click',
          section_details: 'section : <section>',
          article_name: '<headline>',
          widget_headline: '<headline>',
          widget_section: '<section>',
          widget_type: "today's section",
        },
      }}
      analyticsStream={analyticsStream}
    >
      <CategorisedArticles
        heading="News"
        articles={previewData.recommendations.articles}
      />
    </TrackingContextProvider>
  )
);
