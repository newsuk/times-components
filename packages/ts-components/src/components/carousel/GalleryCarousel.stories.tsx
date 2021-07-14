import React from 'react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { GalleryCarousel } from './GalleryCarousel';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { dataLarge, dataRegular, dataSmall } from './fixtures/carousel';
import { storiesOf } from '@storybook/react';

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
        isLarge={true}
        isSmall={false}
        sectionColour="#13354E"
      />
    </div>
  ))
  .add('Regular', () => (
    <div style={{ margin: '20px 0px' }}>
      <GalleryCarousel
        data={dataRegular}
        isLarge={false}
        isSmall={false}
        sectionColour="#13354E"
      />
    </div>
  ))
  .add('Small', () => (
    <div style={{ margin: '20px 0px' }}>
      <GalleryCarousel
        data={dataSmall}
        isLarge={false}
        isSmall={true}
        sectionColour="#13354E"
      />
    </div>
  ));
