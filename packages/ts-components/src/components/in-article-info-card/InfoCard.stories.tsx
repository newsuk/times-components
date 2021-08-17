import React from 'react';
import { storiesOf } from '@storybook/react';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { InfoCard } from './InfoCard';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import previewData from '../../fixtures/preview-data/in-article-info-card';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

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
      <InfoCard sectionColour="#636C17" activeQuotes={false}/>
    </FetchProvider>
  ))
  .add('Standard with Image', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43961">
      <InfoCard sectionColour="#636C17" activeQuotes={false}/>
    </FetchProvider>
  ))
  .add('Wide with Copy', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43603">
      <InfoCard sectionColour="#636C17" activeQuotes={false}/>
    </FetchProvider>
  ))
  .add('Wide with Image', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43614">
      <InfoCard sectionColour="#636C17" activeQuotes={false}/>
    </FetchProvider>
  ))

  .add('Quotes Full Width - No title', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43994">
      <InfoCard sectionColour="#636C17" activeQuotes={true} />
    </FetchProvider>
  ))

  .add('Quotes Standard', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43993">
      <InfoCard sectionColour="#636C17" activeQuotes={true}/>
    </FetchProvider>
  ))

  .add('Quotes Full Width', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43991">
      <InfoCard sectionColour="#636C17" activeQuotes={true} />
    </FetchProvider>
  ));
