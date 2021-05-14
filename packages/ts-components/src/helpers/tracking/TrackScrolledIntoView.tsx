import React, { useEffect, useState } from 'react';

import { useTrackingContext } from './TrackingContextProvider';
type TrackScrolledIntoViewProps = {
  analyticsEvent: any;
  children: (
    props: { intersectObserverRef: (ref: HTMLDivElement | null) => void }
  ) => JSX.Element;
};
export const TrackScrolledIntoView = ({
  children,
  analyticsEvent
}: TrackScrolledIntoViewProps) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { fireAnalyticsEvent } = useTrackingContext();
  useEffect(
    () => {
      let observer: IntersectionObserver | null;
      if (ref) {
        observer =
          (typeof window !== 'undefined' &&
            window.IntersectionObserver &&
            new window.IntersectionObserver(
              entries => {
                if (entries[0].isIntersecting) {
                  observer && observer.disconnect();

                  fireAnalyticsEvent && fireAnalyticsEvent(analyticsEvent);
                }
              },
              {
                threshold: 0.5
              }
            )) ||
          null;
        observer && observer.observe(ref);
      }
      return () => {
        observer && observer.disconnect();
      };
    },
    [ref]
  );

  return <>{children({ intersectObserverRef: setRef })}</>;
};
