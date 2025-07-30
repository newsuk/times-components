import React from 'react';
import { InstagramContainer } from '../styles';
import { Placeholder } from '@times-components/image';


export const Instagram = ({ url }: { url: string }) => {



  return (
    <InstagramContainer
      className="instagram-media"
      data-instgrm-captioned
      data-instgrm-permalink={`${url}?utm_source=ig_embed&amp;utm_campaign=loading`}
      data-instgrm-version="14"
    >
      <Placeholder />
    </InstagramContainer>
  );
};
