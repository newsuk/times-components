import authorProfileTests from "../helpers/author-profile-helper";

authorProfileTests({
  qs: "?pq=1",
  variant: "Persisted Query",
  stickyElements: ["#nav"],
  skipSnapshotTest: true
});
