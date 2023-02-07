import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { InfoCardBulletPoints } from './InfoCardBulletPoints';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

storiesOf('Typescript Component/In Article/Info Card', module).add(
  'Bullet Points',
  () => (
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
        <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43978">
          <InfoCardBulletPoints sectionColour="#636C17" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  )
);
