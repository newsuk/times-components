import renderArticleSkeleton from "./showcase-helper";

export default {
  children: [
    {
      component: ({ boolean, select }, { decorateAction }) =>
        renderArticleSkeleton({
          boolean,
          decorateAction,
          hasScaling: true,
          select
        }),
      name: "Default",
      platform: "native",
      type: "story"
    }
  ],
  name: "Composed/Article Skeleton"
};
