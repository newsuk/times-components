import React, { useState } from 'react';

import { useTrackingContext } from './TrackingContextProvider';
import { useIntersectionObserver } from '../../utils/intersectObserverHook';
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

  useIntersectionObserver(
    ref,
    () => fireAnalyticsEvent && fireAnalyticsEvent(analyticsEvent),
    {
      threshold: 0.5
    }
  );
  return <>{children({ intersectObserverRef: setRef })}</>;
};
