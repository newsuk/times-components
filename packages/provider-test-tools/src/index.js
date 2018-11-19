import schema from "@times-components/schema/schema.json";
import article from "./article";
import articleComments from "./article-comments";
import articleListNoImages from "./fixtures/article-list-no-images.json";
import articleListWithImages from "./fixtures/article-list-with-images.json";
import author from "./fixtures/author.json";
import authorProfile from "./author-profile";
import bylineWithLink from "./fixtures/byline-with-link.json";
import clientTester from "./client-tester";
import generateQueries from "./generate-queries";
import mm from "./make-mocks";
import MockedProvider from "./mocked-provider";
import MockFixture, { schemaToMocks } from "./mock-fixture";
import providerTester from "./provider-tester";
import topic from "./topic";
import topicArticles from "./fixtures/topic-articles.json";
import topicHead from "./fixtures/topic.json";
import video from "../fixtures/video.json";

const fixtures = {
  articleListNoImages,
  articleListWithImages,
  author,
  bylineWithLink,
  topic: topicHead,
  topicArticles,
  video
};

const makeMocks = mm(schema);

export * from "./helpers";
export {
  article,
  articleComments,
  authorProfile,
  clientTester,
  fixtures,
  generateQueries,
  makeMocks,
  MockedProvider,
  MockFixture,
  providerTester,
  schemaToMocks,
  topic
};
