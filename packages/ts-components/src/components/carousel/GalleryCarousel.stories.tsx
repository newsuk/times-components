import React from 'react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { showcaseConverter } from '@times-components/storybook';
import { GalleryCarousel } from './GalleryCarousel';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { dataLarge, dataRegular, dataSmall } from './fixtures/carousel';

const showcase = {
  children: [
    {
      decorator: (storyFn: () => React.ReactNode) => (
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
      ),
      type: 'decorator'
    },
    {
      component: () => (
        <div style={{ margin: '20px 0px' }}>
          <GalleryCarousel
            data={dataLarge}
            isLarge={true}
            isSmall={false}
            sectionColour="#13354E"
          />
        </div>
      ),
      name: 'Carousel - Large',
      type: 'story'
    },
    {
      component: () => (
        <div style={{ margin: '20px 0px' }}>
          <GalleryCarousel
            data={dataRegular}
            isLarge={false}
            isSmall={false}
            sectionColour="#13354E"
          />
        </div>
      ),
      name: 'Carousel - Regular',
      type: 'story'
    },
    {
      component: () => (
        <div style={{ margin: '20px 0px' }}>
          <GalleryCarousel
            data={dataSmall}
            isLarge={false}
            isSmall={true}
            sectionColour="#13354E"
          />
        </div>
      ),
      name: 'Carousel - Small',
      type: 'story'
    }
  ],
  name: 'Typescript Component/Gallery Carousel'
};

// @ts-ignore
showcaseConverter(module, showcase);
