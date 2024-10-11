import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ author, page, pageSize }) => ({
      articlesCount: get(author, "articles.count", 0),
      authorName: author && author.name,
      page,
      pageSize,
      registrationType: (() => {
        const user = (global.nuk && global.nuk.user) || {};
        return user && user.registrationType ? user.registrationType : "";
      })()
    }),
    trackingObjectName: "AuthorProfile"
  });
