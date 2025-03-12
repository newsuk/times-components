import React, { useEffect } from 'react';
import { InstagramContainer } from '../styles';
import { Placeholder } from '@times-components/image';

export const Instagram = ({ url }: { url: string }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
