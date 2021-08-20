import React from 'react';
import { storiesOf } from '@storybook/react';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { GalleryCarousel } from './GalleryCarousel';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import previewData from '../../fixtures/preview-data/gallery-carousel';
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
    <FetchProvider previewData={previewData[43486]}>
      <div style={{ margin: '20px 0px' }}>
        <GalleryCarousel sectionColour="#13354E" />
      </div>
    </FetchProvider>
  ))
  .add('Regular', () => (
    <FetchProvider previewData={previewData[43484]}>
      <div style={{ margin: '20px 0px' }}>
        <GalleryCarousel sectionColour="#13354E" />
      </div>
    </FetchProvider>
  ))
  .add('Small', () => (
    <FetchProvider previewData={previewData[43434]}>
      <div style={{ margin: '20px 0px' }}>
        <GalleryCarousel sectionColour="#13354E" />
      </div>
    </FetchProvider>
  ));
