// @flow
export type AnalyticsEventObjectType = {
  object?: string,
  component: string,
  action: "Viewed",
  attrs: {
    [string]: mixed
  }
};

export type TrackingContextPropsType = {
  analyticsStream: (ae: AnalyticsEventObjectType) => void,
  [string]: mixed
};

export type TrackingContextObjectType = {
  getAttrs?: any => mixed,
  trackingObjectName?: string,
  isDataReady?: (props: TrackingContextPropsType) => boolean
};
