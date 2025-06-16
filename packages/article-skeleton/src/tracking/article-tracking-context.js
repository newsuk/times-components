import get from "lodash.get";
import { withTrackingContext } from "@times-components/tracking";
import {
  getRegistrationType,
  getCustomerType,
  getSharedStatus,
  getIsLiveOrBreakingFlag,
  getActiveArticleFlags
} from "../data-helper";

export default Component =>
  withTrackingContext(Component, {
    getAttrs: ({ data, pageSection, navigationMode, referralUrl = "" }) => {
      let editionType = "";
      let hasAccessViaTimes = false;
      const flags = data.expirableFlags;

      if (window) {
        // eslint-disable-next-line
        if (window.__TIMES_ACCESS_AND_IDENTITY__) {
          // eslint-disable-next-line
          if (window.__TIMES_ACCESS_AND_IDENTITY__.hasAccess) {
            hasAccessViaTimes = true;
          }
        }
      }

      if (navigationMode) {
        const { isMyArticles, isPastSixDays } = navigationMode;
        if (isMyArticles) {
          editionType = "my articles";
        } else {
          editionType = isPastSixDays ? "past 6 days" : "current edition";
        }
      }

      // Build hierarchical page sections
      const rawHierarchy = get(data, "sectionHierarchy", []);
      const sectionHierarchy = Array.isArray(rawHierarchy)
        ? rawHierarchy.filter(Boolean)
        : [];

      const sectionAttrs = {};

      sectionHierarchy.forEach((section, index) => {
        const key = index === 0 ? "page_section" : `page_section_${index + 1}`;
        const value = sectionHierarchy.slice(0, index + 1).join(":");
        sectionAttrs[key] = value;
      });

      // Fallback if no sectionHierarchy provided
      if (sectionHierarchy.length === 0 && pageSection) {
        sectionAttrs.page_section = pageSection;
      }

      return {
        ...sectionAttrs,
        articleId: get(data, "id", ""),
        article_topic_tags: data.topics
          ? data.topics.map(topic => topic.name)
          : [],
        isLocked: hasAccessViaTimes ? "unlocked" : "locked",
        bylines: get(
          data,
          "bylines[0].byline[0].children[0].attributes.value",
          ""
        ),
        headline: get(data, "headline", ""),
        label: get(data, "label", ""),
        pageName: `${get(data, "slug", "")}-${get(
          data,
          "shortIdentifier",
          ""
        )}`,
        edition_type: editionType,
        publishedTime: get(data, "publishedTime", ""),
        parent_site: get(data, "publicationName", ""),
        referralUrl,
        section: pageSection || get(data, "section", ""),
        template: get(data, "template", "Default"),
        registrationType: getRegistrationType(),
        customerType: getCustomerType(),
        shared: getSharedStatus(),
        article_flag: getActiveArticleFlags(flags)
          ? getActiveArticleFlags(flags)
          : "no flag",
        article_template_name: getIsLiveOrBreakingFlag(flags)
          ? "live template"
          : "standard template"
      };
    },
    trackingObjectName: "Article"
  });
