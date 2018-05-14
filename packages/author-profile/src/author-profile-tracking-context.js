import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    trackingObjectName: "AuthorProfile",
    getAttrs: ({ author, page, pageSize }) => ({
      authorName: author && author.name,
      articlesCount: get(author, "articles.count", 0),
      page,
      pageSize
    })
  });
