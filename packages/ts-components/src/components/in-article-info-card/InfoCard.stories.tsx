import React from 'react';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { InfoCard } from './InfoCard';
import { storiesOf } from '@storybook/react';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

storiesOf('Typescript Component/In Article/Info Card', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
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
      <ArticleHarness>{storyFn()}</ArticleHarness>
    </TrackingContextProvider>
  ))

  .add('Standard with Copy & Subtitle', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43606">
      <InfoCard sectionColour="#636C17" />
    </FetchProvider>
  ))

  .add('Standard with Image', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43961">
      <InfoCard sectionColour="#636C17" />
    </FetchProvider>
  ))

  .add('Wide with Copy', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43603">
      <InfoCard sectionColour="#636C17" />
    </FetchProvider>
  ))

  .add('Wide with Image', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43614">
      <InfoCard sectionColour="#636C17" />
    </FetchProvider>
  ));
