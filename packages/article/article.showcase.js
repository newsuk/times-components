/* eslint-disable react/prop-types */
import renderArticleConfig from "./showcase-helper";

export default {
  children: [
    {
      component: ({ boolean, color, select }, { decorateAction }) =>
        renderArticleConfig({
          boolean,
          color,
          decorateAction,
          hasScaling: true,
          select
        }),
      name: "Article with template choice",
      platform: "native",
      type: "story"
    }
  ],
  name: "Pages/Article"
};
