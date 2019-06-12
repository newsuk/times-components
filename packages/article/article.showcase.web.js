/* eslint-disable react/prop-types */
/* eslint-env browser */
import React from "react";
import { USER_STATES } from "@times-components/user-state";
import renderArticleConfig from "./showcase-helper";

const link = typeof document === "object" &&
  window !== window.top && (
    <a
      href={`/iframe.html${window.top.location.search}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      Open in new window
    </a>
  );

export default {
  children: [
    {
      component: ({ boolean, color, select }, { decorateAction }) =>
        renderArticleConfig({
          boolean,
          color,
          decorateAction,
          hasScaling: false,
          link,
          select
        }),
      name: "Article with template choice",
      platform: "web",
      type: "story"
    },
    {
      component: ({ boolean, color, select }, { decorateAction }) =>
        renderArticleConfig({
          boolean,
          color,
          decorateAction,
          hasScaling: false,
          link,
          select
        }),
      name: "Article teaser",
      platform: "web",
      type: "story",
      defaultUserState: USER_STATES.GUEST
    },
    {
      component: ({ boolean, color, select }, { decorateAction }) =>
        renderArticleConfig({
          boolean,
          color,
          decorateAction,
          hasScaling: false,
          link,
          select
        }),
      name: "Article metered expired",
      platform: "web",
      type: "story",
      defaultUserState: USER_STATES.RA_EXPIRED
    }
  ],
  name: "Pages/Article (marketing overlays)"
};
