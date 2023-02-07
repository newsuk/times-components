import React from 'react';
import { storiesOf } from '@storybook/react';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { GalleryCarousel } from './GalleryCarousel';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';

import previewData from '../../fixtures/preview-data/gallery-carousel';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

storiesOf('Typescript Component/Gallery Carousel', module)
  .add('Wide', () => (
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
        <FetchProvider previewData={previewData[43486]}>
          <div style={{ margin: '20px 0px' }}>
            <GalleryCarousel sectionColour="#13354E" />
          </div>
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ))
  .add('Regular', () => (
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
        <FetchProvider previewData={previewData[43484]}>
          <div style={{ margin: '20px 0px' }}>
            <GalleryCarousel sectionColour="#13354E" />
          </div>
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ))
  .add('Small', () => (
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
        <FetchProvider previewData={previewData[43434]}>
          <div style={{ margin: '20px 0px' }}>
            <GalleryCarousel sectionColour="#13354E" />
          </div>
        </FetchProvider>
      </ArticleHarness>
    </TrackingContextProvider>
  ));
