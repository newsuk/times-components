import React from 'react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { showcaseConverter } from '@times-components/storybook';
import { GalleryCarousel } from './GalleryCarousel';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

const data = [
  {
    paneldata: {
      label: 'venezuelan politics',
      headline: 'Five of the best themed parksdbest theme 1',
      imageTitle: 'Thorpe Park 1',
      copy:
        'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a.Scelerisque a ullamcorper id maecenas tempor convallis ac crasParturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in di 1',
      credit: 'Credit 1'
    },
    carouseldata: {
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F46cebe30-c82d-11eb-b6f5-fed739e7c1ca.jpg?crop=6676%2C3755%2C65%2C707&resize=1180'
    }
  },
  {
    paneldata: {
      label: 'label 2',
      headline: 'Five of the best themed parksdbest theme 2',
      imageTitle: 'Thorpe Park 2',
      copy:
        'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a.Scelerisque a ullamcorper id maecenas tempor convallis ac crasParturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in di 2',
      credit: 'Credit 2'
    },
    carouseldata: {
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F24f0ce12-c444-11eb-8601-6a2ece3e4634.png?crop=778%2C438%2C84%2C7&resize=1180'
    }
  }
];

const dataLarge = [
  {
    paneldata: {
      label: 'venezuelan politics',
      headline: 'Five of the best theme parksFive of the best theme parksFive of the best ts 1',
      imageTitle: 'Thorpe Park 1',
      copy:
        'You’ll have to wait until May 21 to test the UK’s first live Black Mirror experience, which promises a creepy, sensory-defying maze. In the meantime, Stealth, one of Europe’s fastest and tallest rollercoasters is ready for the white-knucklers, plus three retro-inspired, pop-up outdoor rides are planned and the park’s self-contained “bite-sized” Shark Cabins are bookable for short breaksddddddddddd 1',
      credit: 'IMAGE BY JOHN DOE 1'
    },
    carouseldata: {
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F46cebe30-c82d-11eb-b6f5-fed739e7c1ca.jpg?crop=6676%2C3755%2C65%2C707&resize=1180'
    }
  },
  {
    paneldata: {
      label: 'label 2',
      headline: 'Five of the best theme parksFive of the best theme parksFive of the best ts',
      imageTitle: 'Thorpe ParkThorpe ParkThorpe ParkThorpe ParkThorpe ParkThorpe ParkThor',
      copy:
        'You’ll have to wait until May 21 to test the UK’s first live Black Mirror experience, which promises a creepy, sensory-defying maze. In the meantime, Stealth, one of Europe’s fastest and tallest rollercoasters is ready for the white-knucklers, plus three retro-inspired, pop-up outdoor rides are planned and the park’s self-contained “bite-sized” Shark Cabins are bookable for short breaksddddddddddd 2',
      credit: 'IMAGE BY JOHN DOE 2'
    },
    carouseldata: {
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F24f0ce12-c444-11eb-8601-6a2ece3e4634.png?crop=778%2C438%2C84%2C7&resize=1180'
    }
  }
];

const dataSmall = [
  {
    paneldata: {
      label: 'venezuelan politics',
      headline: 'Five of the best theme par 1',
      imageTitle: 'Thorpe Park 1',
      copy:
        'You’ll have to wait until May 21 to test the UK’s first live Black Mirror experience, which promises a creepy, sensory-defying maze. In the meantime, Stealth, one of Europe’s fastest and tallest rollercoasters is ready for the white-knucklers, plus three retro-inspired, pop-up outdoor rides are planned and the park’s self-contained “bite-sized” Shark Cabins are bookable for short breaks',
      credit: 'IMAGE BY JOHN DO 1'
    },
    carouseldata: {
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F46cebe30-c82d-11eb-b6f5-fed739e7c1ca.jpg?crop=6676%2C3755%2C65%2C707&resize=1180'
    }
  },
  {
    paneldata: {
      label: 'label 2',
      headline: 'Five of the best theme parksFive of the best theme parks',
      imageTitle: 'Thorpe Park 2',
      copy:
        'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a, dignissim in ddignissim in ddigni 2',
      credit: 'IMAGE BY JOHN DO 2'
    },
    carouseldata: {
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F24f0ce12-c444-11eb-8601-6a2ece3e4634.png?crop=778%2C438%2C84%2C7&resize=1180'
    }
  }
];

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
            data={data}
            isLarge={false}
            isSmall={false}
            sectionColour="#13354E"
          />
        </div>
      ),
      name: 'Carousel',
      type: 'story'
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
      name: 'Carousel Large',
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
      name: 'Carousel Small',
      type: 'story'
    }
  ],
  name: 'Typescript Component/Gallery Carousel'
};

// @ts-ignore
showcaseConverter(module, showcase);
