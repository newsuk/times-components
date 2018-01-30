// @flow
export type AnalyticsEventObjectType = {
  object: {},
  component: string,
  action: string,
  attrs: Function
};

export type TrackingContextPropsType = {
  analyticsStream: ({
    ...AnalyticsEventObjectType,
    object: string
  }) => void
};

export type TrackingContextObjectType = {
  getAttrs: any => mixed,
  trackingObjectName: string,
  isDataReady: (props: TrackingContextPropsType) => boolean
};
