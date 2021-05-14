import React, { useContext } from 'react';

export type TrackingContext = { [key: string]: string };

export type TrackingContextProps = {
  analyticsStream?: (analyticsEvent: any) => void;
  context: TrackingContext;
};

export type TrackingContextType = TrackingContextProps & {
  fireAnalyticsEvent?: (analyticsEvent: any) => void;
};

export interface AnalyticsAttributes {
  [prop: string]: string;
}
const TrackingContext = React.createContext<TrackingContextType>({
  context: {}
});

type TrackingContextChildren = {
  children:
    | ((
        props: { fireAnalyticsEvent: (evt: any) => void }
      ) => JSX.Element | JSX.Element[])
    | JSX.Element
    | JSX.Element[];
};

export const useTrackingContext = () => useContext(TrackingContext);

export const TrackingContextProvider = ({
  children,
  analyticsStream,
  context
}: TrackingContextProps & TrackingContextChildren) => {
  const parentTrackingContext = useContext(TrackingContext);
  const stream =
    analyticsStream !== undefined
      ? analyticsStream
      : parentTrackingContext.analyticsStream;

  // tslint:disable-next-line:no-console
  console.log('TrackingContextProvider analyticsStream', analyticsStream);
  // tslint:disable-next-line:no-console
  console.log(
    'TrackingContextProvider parentTrackingContext',
    parentTrackingContext
  );

  const fireAnalyticsEvent = (event: any) => {
    const aggregatedEvent = {
      ...parentTrackingContext.context,
      ...context,
      ...event
    };
    // tslint:disable-next-line:no-console
    console.log('fireAnalyticsEvent analyticsStream', analyticsStream);
    // tslint:disable-next-line:no-console
    console.log(
      'fireAnalyticsEvent parentTrackingContext',
      parentTrackingContext
    );
    stream
      ? stream(aggregatedEvent)
      : // tslint:disable-next-line:no-console
        console.error('no analytics stream to send to', aggregatedEvent);
  };

  return (
    <TrackingContext.Provider
      value={{ fireAnalyticsEvent, context, analyticsStream: stream }}
    >
      {typeof children === 'function'
        ? children({ fireAnalyticsEvent })
        : children}
    </TrackingContext.Provider>
  );
};
