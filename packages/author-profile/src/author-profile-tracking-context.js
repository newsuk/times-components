import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";
// import { getRegistrationType } from "@times-components/article-skeleton";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ author, page, pageSize }) => ({
      articlesCount: get(author, "articles.count", 0),
      authorName: author && author.name,
      page,
      pageSize,
      registrationType:
        typeof window !== "undefined"
          ? window?.nuk?.user?.registrationType ?? ""
          : ""
    }),
    trackingObjectName: "AuthorProfile"
  });
