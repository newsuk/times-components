import React, { useContext } from 'react';
import merge from 'lodash.merge';

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
        }
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

  const aggregatedContext = merge({}, parentTrackingContext.context, context);

  const fireAnalyticsEvent = (event: TrackingContext) => {
    const aggregatedEvent = merge({}, aggregatedContext, event, {
      attrs: {
        eventTime: new Date().toISOString()
      }
    });

    stream
      ? stream(aggregatedEvent)
      : // tslint:disable-next-line:no-console
        console.error('no analytics stream to send to', aggregatedEvent);
  };

  return (
    <TrackingContext.Provider
      value={{
        fireAnalyticsEvent,
        context: aggregatedContext,
        analyticsStream: stream
      }}
    >
      {typeof children === 'function'
        ? children({ fireAnalyticsEvent })
        : children}
    </TrackingContext.Provider>
  );
};
