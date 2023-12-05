import topicPageTests from "../helpers/topic-helper";

// persisted queries
topicPageTests({
  qs: "?pq=1",
  variant: "Persisted Query",
  stickyElements: ["#nav"]
});
