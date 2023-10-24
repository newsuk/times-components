/* eslint-disable react/prop-types */
/* eslint-env browser */
import React from "react";
import { USER_STATES } from "@times-components/user-state";
import { NewTab } from "@times-components/storybook";
import { TCThemeProvider } from "@times-components/ts-newskit";
import renderArticleConfig from "./showcase-helper";

export default {
  children: [
    {
      component: ({ boolean, color, select }, { decorateAction }) => (
        <TCThemeProvider>
          {renderArticleConfig({
            boolean,
            color,
            decorateAction,
            hasScaling: false,
            link: <NewTab />,
            select
          })}
        </TCThemeProvider>
      ),
      name: "Article with template choice",
      platform: "web",
      type: "story"
    },
    {
      component: ({ boolean, color, select }, { decorateAction }) => (
        <TCThemeProvider>
          {renderArticleConfig({
            boolean,
            color,
            decorateAction,
            hasScaling: false,
            link: <NewTab />,
            select
          })}
        </TCThemeProvider>
      ),
      name: "Article teaser",
      platform: "web",
      type: "story",
      defaultUserState: USER_STATES.GUEST
    }
  ],
  name: "Pages/Article (marketing overlays)"
};
