/* eslint-disable react/prop-types */
/* eslint-env browser */
import React from "react";
import { USER_STATES } from "@times-components/user-state";
import { NewTab } from "@times-components/storybook";
import renderArticleConfig from "./showcase-helper";

export default {
  children: [
    {
      component: ({ boolean, color, select }, { decorateAction }) =>
        renderArticleConfig({
          boolean,
          color,
          decorateAction,
          hasScaling: false,
          link: <NewTab />,
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
          link: <NewTab />,
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
          link: <NewTab />,
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
