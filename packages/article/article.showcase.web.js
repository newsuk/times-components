/* eslint-disable react/prop-types */
/* eslint-env browser */
import React from "react";
import { StickyProvider } from "@times-components/sticky";
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

function renderWebArticleWithConfig(config) {
  return (
    <>
      <div
        style={{
          height: 50,
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          backgroundColor: "#13354E",
          zIndex: 2
        }}
      />
      <StickyProvider style={{ marginTop: 50 }}>
        {renderArticleConfig(config)}
      </StickyProvider>
    </>
  );
}

export default {
  children: [
    {
      component: ({ boolean, color, select }, { decorateAction }) =>
        renderWebArticleWithConfig({
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
        renderWebArticleWithConfig({
          boolean,
          color,
          decorateAction,
          hasScaling: false,
          isTeaser: true,
          isLoggedIn: false,
          link,
          select
        }),
      name: "Article teaser",
      platform: "web",
      type: "story"
    },
    {
      component: ({ boolean, color, select }, { decorateAction }) =>
        renderWebArticleWithConfig({
          boolean,
          color,
          decorateAction,
          hasScaling: false,
          isTeaser: true,
          isLoggedIn: true,
          isMeteredExpired: true,
          link,
          select
        }),
      name: "Article metered expired",
      platform: "web",
      type: "story"
    }
  ],
  name: "Pages/Article (marketing overlays)"
};
