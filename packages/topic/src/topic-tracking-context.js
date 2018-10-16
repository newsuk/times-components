import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ topic, page, pageSize }) => ({
      page,
      pageSize,
      topicName: topic && topic.name
    }),
    trackingObjectName: "Topic"
  });
