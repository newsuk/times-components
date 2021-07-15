import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { GalleryCarousel } from './GalleryCarousel';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { dataSmall, dataRegular, dataLarge } from './fixtures/carousel';

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

  .add('Large', () => (
    <div style={{ margin: '20px 0px' }}>
      <GalleryCarousel
        data={dataLarge}
        sectionColour="#13354E"
      />
    </div>
  ))
  .add('Regular', () => (
    <div style={{ margin: '20px 0px' }}>
      <GalleryCarousel
        data={dataRegular}
        sectionColour="#13354E"
      />
    </div>
  ))
  .add('Small', () => (
    <div style={{ margin: '20px 0px' }}>
      <GalleryCarousel
        data={dataSmall}
        sectionColour="#13354E"
      />
    </div>
  ));