import { useEffect } from 'react';

export function useIntersectionObserver<T extends Element | null>(
  ref: T,
  onIntersect: () => void,
  options: IntersectionObserverInit
): void {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('intersect obs', ref, onIntersect, options)
  return useEffect(
    () => {
      let observer: IntersectionObserver | undefined;
      if (ref !== null) {
        observer =
          (typeof window !== 'undefined' &&
            window.IntersectionObserver &&
            new window.IntersectionObserver(entries => {
              console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              console.log('intersect obs entries', entries, entries[0], entries[0].isIntersecting)
              if (entries[0].isIntersecting) {
                observer && observer.disconnect();

                onIntersect && onIntersect();
              }
            }, options)) ||
          undefined;
        observer && observer.observe(ref as Element);
      }
      return () => {
        observer && observer.disconnect();
      };
    },
    [ref]
  );
}
