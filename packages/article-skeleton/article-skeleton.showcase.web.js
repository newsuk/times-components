import renderArticleSkeleton from "./showcase-helper";

export default {
  children: [
    {
      component: ({ boolean, select }, { decorateAction }) =>
        renderArticleSkeleton({
          boolean,
          decorateAction,
          hasScaling: false,
          select
        }),
      name: "Default",
      platform: "web",
      type: "story"
    }
  ],
  name: "Composed/Article Skeleton"
};
