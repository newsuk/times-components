import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { InfoCardBulletPoints } from './InfoCardBulletPoints';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { getDeckApiUrl } from '../../utils/getDeckApiUrl';

const deckApiUrl: string = getDeckApiUrl();

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
        <FetchProvider url={deckApiUrl + '?id=43978'}>
          <InfoCardBulletPoints sectionColour="#636C17" />
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  )
);
