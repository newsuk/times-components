/* eslint-disable react/prop-types */
import renderArticleConfig from "./showcase-helper";

export default {
  children: [
    {
      component: ({ boolean, select }, { decorateAction }) =>
        renderArticleConfig({
          boolean,
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
