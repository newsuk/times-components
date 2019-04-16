import schema from "@times-components/schema/schema.json";
import article from "./article";
import articleExtras from "./article-extras";
import articleListNoImages from "./fixtures/article-list-no-images.json";
import articleListWithImages from "./fixtures/article-list-with-images.json";
import author from "./fixtures/author.json";
import authorProfile from "./author-profile";
import bylineWithLink from "./fixtures/byline-with-link.json";
import clientTester from "./client-tester";
import edition from "./edition";
import generateQueries from "./generate-queries";
import mm from "./make-mocks";
import MockedProvider from "./mocked-provider";
import MockFixture, { schemaToMocks } from "./mock-fixture";
import nativeEdition from "./native-edition";
import providerTester from "./provider-tester";
import topic from "./topic";
import inlineVideo from "./fixtures/inline-video.json";
import keyFacts from "./fixtures/key-facts.json";
import pullQuote from "./fixtures/pull-quote.json";
import topicArticles from "./fixtures/topic-articles.json";
import topicHead from "./fixtures/topic.json";
import video from "../fixtures/video.json";

const fixtures = {
  articleListNoImages,
  articleListWithImages,
  author,
  bylineWithLink,
  inlineVideo,
  keyFacts,
  pullQuote,
  topic: topicHead,
  topicArticles,
  video
};

const makeMocks = mm(schema);

export * from "./helpers";
export {
  article,
  articleExtras,
  authorProfile,
  clientTester,
  edition,
  fixtures,
  generateQueries,
  makeMocks,
  MockedProvider,
  MockFixture,
  nativeEdition,
  providerTester,
  schemaToMocks,
  topic
};
