import React, { useState } from 'react';

import { TrackingContext, useTrackingContext } from './TrackingContextProvider';
import { useIntersectionObserver } from '../../utils/intersectObserverHook';
type TrackScrolledIntoViewProps = {
  analyticsEvent: TrackingContext;
  children: (
    props: { intersectObserverRef: (ref: HTMLDivElement | null) => void }
  ) => JSX.Element;
};
export const TrackScrolledIntoView = ({
  analyticsEvent,
  children
}: TrackScrolledIntoViewProps) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { fireAnalyticsEvent } = useTrackingContext();

  useIntersectionObserver(
    ref,
    () =>
      fireAnalyticsEvent &&
      fireAnalyticsEvent({
        action: 'Scrolled',
        ...analyticsEvent
      }),
    {
      threshold: 0.5
    }
  );
  return <>{children({ intersectObserverRef: setRef })}</>;
};
