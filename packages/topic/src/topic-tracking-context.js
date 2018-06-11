import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    trackingObjectName: "Topic",
    getAttrs: ({ topic, page, pageSize }) => ({
      topicName: topic && topic.name,
      page,
      pageSize
    })
  });
