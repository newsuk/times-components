import React, { useEffect, useState } from 'react';

type AnalyticsStreamType = (event: any) => void;

export default function trackScrolled<P>(
  WrappedComponent: React.FC<P>,
  analyticsEvent: any
) {
  return function(props: P & { analyticsStream: AnalyticsStreamType }) {
    const [ref, setRef] = useState(null);
    useEffect(
      () => {
        console.log(ref, analyticsEvent);
      },
      [ref]
    );

    return <WrappedComponent ref={setRef} {...props} />;
  };
}
