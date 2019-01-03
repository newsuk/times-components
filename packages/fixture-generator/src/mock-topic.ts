import { Topic, TopicArticles } from "./types";
import MockMarkup from "./mock-markup";
import MockArticle from "./mock-article";

const getTopicArticles = (count: number): TopicArticles => ({
  count,
  list: new Array(count).fill(new MockArticle().get())
});

class MockTopic {
  topic: Topic;

  constructor() {
    this.topic = {
      articles: getTopicArticles(0),
      description: new MockMarkup().addParagraphs(1).get(),
      name: "Topic Page",
      slug: "topic-page"
    };
  }

  setTopicArticles(count: number) {
    this.topic.articles = getTopicArticles(count);
    return this;
  }

  get() {
    return this.topic;
  }
}

export default MockTopic;
