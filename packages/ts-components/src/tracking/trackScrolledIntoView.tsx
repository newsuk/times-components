import React, { useEffect, useState } from 'react';
import { AnalyticsProps } from '@times-components/tracking';

export default function trackScrolledIntoView<P>(
  WrappedComponent: React.FC<P>,
  analyticsEvent: {
    trackingName: string;
    getAttrs: (props: P & AnalyticsProps) => {};
  }
): (props: P & AnalyticsProps) => JSX.Element {
  return (props: P & AnalyticsProps) => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);

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

                    props.analyticsStream({
                      action: 'Scrolled',
                      object: analyticsEvent.trackingName,
                      attr: analyticsEvent.getAttrs(props)
                    });
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

    return <WrappedComponent ref={setRef} {...props} />;
  };
}
