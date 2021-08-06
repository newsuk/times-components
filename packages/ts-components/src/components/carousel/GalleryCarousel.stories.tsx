import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { GalleryCarousel } from './GalleryCarousel';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

storiesOf('Typescript Component/Gallery Carousel', module)
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

  .add('Wide', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43486">
      <div style={{ margin: '20px 0px' }}>
        <GalleryCarousel sectionColour="#13354E" />
      </div>
    </FetchProvider>
  ))
  .add('Regular', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43484">
      <div style={{ margin: '20px 0px' }}>
        <GalleryCarousel sectionColour="#13354E" />
      </div>
    </FetchProvider>
  ))
  .add('Small', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43434">
      <div style={{ margin: '20px 0px' }}>
        <GalleryCarousel sectionColour="#13354E" />
      </div>
    </FetchProvider>
  ));
