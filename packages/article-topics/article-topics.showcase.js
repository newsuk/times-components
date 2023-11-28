import topicsData from "./fixtures/topics";
import renderArticleTopics from "./showcase-helper";

export default {
  children: [
    {
      component: (_, { decorateAction }) =>
        renderArticleTopics({ data: topicsData, decorateAction }),
      name: "Group of Topics",
      platform: "web",
      type: "story"
    },
    {
      component: (_, { decorateAction }) =>
        renderArticleTopics({ data: [topicsData[0]], decorateAction }),
      name: "Single Topic",
      platform: "web",
      type: "story"
    }
  ],
  name: "Primitives/Article Topics"
};
