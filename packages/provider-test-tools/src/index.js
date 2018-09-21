import schema from "@times-components/schema/schema.json";
import authorProfile from "./author-profile";
import clientTester from "./client-tester";
import generateQueries from "./generate-queries";
import mm from "./make-mocks";
import MockedProvider from "./mocked-provider";
import MockFixture from "./mock-fixture";
import providerTester from "./provider-tester";
import topic from "./topic";
import articleListNoImages from "./fixtures/article-list-no-images.json";
import articleListWithImages from "./fixtures/article-list-with-images.json";
import author from "./fixtures/author.json";
import topicHead from "./fixtures/topic.json";
import topicArticles from "./fixtures/topic-articles.json";

const fixtures = {
  articleListNoImages,
  articleListWithImages,
  author,
  topic: topicHead,
  topicArticles
};

const makeMocks = mm(schema);

export * from "./helpers";
export {
  authorProfile,
  clientTester,
  fixtures,
  generateQueries,
  makeMocks,
  MockedProvider,
  MockFixture,
  providerTester,
  topic
};
