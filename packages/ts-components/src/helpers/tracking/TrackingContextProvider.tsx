import React, { useContext, useState } from 'react';
import merge from 'lodash.merge';

import { useIntersectionObserver } from '../../utils/intersectObserverHook';

export type TrackingAttributes = { [key: string]: any };
export type TrackingContext = {
  object?: string;
  component?: string;
  action?: string;
  attrs?: TrackingAttributes;
};

export type TrackingContextProps = {
  analyticsStream?: (analyticsEvent: any) => void;
  context?: TrackingContext;
  scrolledEvent?: TrackingContext;
};

export type TrackingContextType = TrackingContextProps & {
  fireAnalyticsEvent?: (analyticsEvent: any) => void;
};

const TrackingContext = React.createContext<TrackingContextType>({
  context: {}
});

type TrackingContextChildren = {
  children:
    | ((
        props: {
          fireAnalyticsEvent: (evt: TrackingContext) => void;
          intersectObserverRef: (ref: HTMLElement | null) => void;
        }
      ) => JSX.Element | JSX.Element[])
    | JSX.Element
    | JSX.Element[];
};

export const useTrackingContext = () => useContext(TrackingContext);

export const TrackingContextProvider = ({
  children,
  analyticsStream,
  context,
  scrolledEvent
}: TrackingContextProps & TrackingContextChildren) => {
  // tslint:disable-next-line:no-console
  console.log('TC log: TCP: ==========');

  const parentTrackingContext = useContext(TrackingContext);
  // tslint:disable-next-line:no-console
  console.log('TC log: TCP: parent=', parentTrackingContext.context);

  const stream =
    analyticsStream !== undefined
      ? analyticsStream
      : parentTrackingContext.analyticsStream;

  const aggregatedContext = merge({}, parentTrackingContext.context, context);
  // tslint:disable-next-line:no-console
  console.log('TC log: TCP: aggregated=', aggregatedContext);

  const fireAnalyticsEvent = (event: TrackingContext) => {
    // tslint:disable-next-line:no-console
    console.log('TC log: TCP: fireEvent=', event);

    const aggregatedEvent = merge({}, aggregatedContext, event, {
      attrs: {
        eventTime: new Date().toISOString()
      }
    });

    // tslint:disable-next-line:no-console
    console.log('TC log: TCP: fireAggregated=', aggregatedEvent);

    stream
      ? stream(aggregatedEvent)
      : // tslint:disable-next-line:no-console
        console.error('no analytics stream to send to', aggregatedEvent);
  };

  const [ref, setRef] = useState<HTMLElement | null>(null);

  if (scrolledEvent) {
    useIntersectionObserver(
      ref,
      () =>
        fireAnalyticsEvent &&
        fireAnalyticsEvent({ action: 'Scrolled', ...scrolledEvent }),
      {
        threshold: 0.5
      }
    );
  }

  return (
    <TrackingContext.Provider
      value={{
        fireAnalyticsEvent,
        context: aggregatedContext,
        analyticsStream: stream
      }}
    >
      {typeof children === 'function'
        ? children({ fireAnalyticsEvent, intersectObserverRef: setRef })
        : children}
    </TrackingContext.Provider>
  );
};
