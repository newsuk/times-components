import React from 'react';

import { FetchProvider, useFetch } from '../helpers/fetch/FetchProvider';
import { storiesOf } from '@storybook/react';
import { InArticlePuff } from './in-article-puff/InArticlePuff';
import GalleryCarousel, { GalleryData } from './carousel/GalleryCarousel';
import { select } from '@storybook/addon-knobs';

const InArticlePreview = ({}) => {
  const data = useFetch() as any;
  if (data.data && !data.loading) {
    console.log(data);
    if (data.data.deck_type === 'InArticle Puff') {
      return <InArticlePuff sectionColour={'red'} />;
    }
    if (data.data.deck_type === 'Image Gallery') {
      const galleryData: GalleryData = {
        label: data.data.fields.label,
        headline: data.data.fields.title,
        carouseldata: data.data.body.data.map(
          ({ data: { title: imageTitle, copy, credit, image } }: any) => ({
            imageTitle,
            copy,
            credit,
            image
          })
        )
      };

      return (
        <GalleryCarousel
          sectionColour={'red'}
          data={galleryData}
          isLarge
          isSmall={false}
        />
      );
    }
  }
  return <div />;
};
storiesOf('Typescript Component/In Article', module).add(
  'In Article Preview',
  () => {
    const id = select('DeckId', ['41548', '43434'], '41548');
    return (
      <FetchProvider
        key={id}
        url={`https://gobble.timesdev.tools/deck/api/deck-post-action/${id}`}
      >
        <InArticlePreview />
      </FetchProvider>
    );
  }
);
