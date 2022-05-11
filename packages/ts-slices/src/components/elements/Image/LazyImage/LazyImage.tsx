import React, { useState, useEffect } from 'react';

import { resizeImage } from '../../../../utils/resizeImage';

import { LazyContainer, BackgroundImage } from './styles';

export const LazyImage: React.FC<{
  url?: string;
  alt?: string;
  isRoundal: boolean;
  isBackground: boolean;
}> = ({ url, alt, isRoundal, isBackground }) => {
  const ref: React.RefObject<HTMLImageElement> = React.createRef();

  const [src, setSrc] = useState<string>();

  useEffect(
    () => {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          entries =>
            entries.forEach(e => {
              if (e.isIntersecting) {
                observer.disconnect();

                if (url && ref.current) {
                  const width = ref.current.offsetWidth;
                  const loader: HTMLImageElement = new Image();
                  loader.onload = () => setSrc(loader.src);
                  loader.src = resizeImage(url, width);
                }
              }
            }),
          { rootMargin: '60px' }
        );

        if (ref.current) {
          observer.observe(ref.current);
        }

        return () => observer.disconnect();
      }

      if (url && ref.current) {
        setSrc(resizeImage(url, ref.current.offsetWidth));
      }

      return;
    },
    [url, ref]
  );

  return (
    <LazyContainer visible={src ? true : false} isRoundal={isRoundal}>
      {isBackground ? (
        <BackgroundImage src={src} ref={ref} role="img" aria-label={alt} />
      ) : (
        <img src={src} alt={alt} ref={ref} />
      )}
    </LazyContainer>
  );
};
