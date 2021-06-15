import React from 'react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { showcaseConverter } from '@times-components/storybook';
import GalleryCarousel from './GalleryCarousel';

const data = [
  {
    paneldata: {
      label: 'venezuelan politics',
      headline: 'Headline 1',
      copy:
        'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a.Scelerisque a ullamcorper ',
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
      headline: 'Headline 2',
      copy:
        'This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy.',
      credit: 'Credit 2'
    },
    carouseldata: {
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F24f0ce12-c444-11eb-8601-6a2ece3e4634.png?crop=778%2C438%2C84%2C7&resize=1180'
    }
  },
  {
    paneldata: {
      label: 'label 3',
      headline: 'Headline 3',
      copy:
        'Parturient mi dictumst suspendisse torquent primis potenti donec in parturient aliquam adipiscing bibendum bibendum magna nisi bibendum dignissim in dis a.Scelerisque a ullamcorper id maecenas tempor convallis ac cras',
      credit: 'Credit 3'
    },
    carouseldata: {
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F941796c6-c855-11eb-b6f5-fed739e7c1ca.jpg?crop=4000%2C2250%2C0%2C208&resize=1180'
    }
  },
  {
    paneldata: {
      label: 'label 4',
      headline: 'Headline 4',
      copy:
        'This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy. Lots of copy. This is some copy.',
      credit: 'Credit 4'
    },
    carouseldata: {
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F30d309fe-c82a-11eb-b6f5-fed739e7c1ca.jpg?crop=6095%2C3429%2C312%2C526&resize=1180'
    }
  }
];

const showcase = {
  children: [
    {
      decorator: (storyFn: () => React.ReactNode) => (
        <ArticleHarness>{storyFn()}</ArticleHarness>
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
            data={data}
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
            data={data}
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
