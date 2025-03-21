import schema from "@times-components/schema/schema.json";
import article from "./article";
import articleVideo from "./article-video";
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
import providerTester from "./provider-tester";
import inlineVideo from "./fixtures/inline-video.json";
import articleVideoData from "../fixtures/article-video.json";
import keyFacts from "./fixtures/key-facts.json";
import pullQuote from "./fixtures/pull-quote.json";
import video from "../fixtures/video.json";
import bookmarks, { MockBookmarksProvider } from "./bookmarks";

const fixtures = {
  articleListNoImages,
  articleListWithImages,
  articleVideoData,
  author,
  bylineWithLink,
  inlineVideo,
  keyFacts,
  pullQuote,
  video
};

const makeMocks = mm(schema);

export * from "./helpers";
export {
  article,
  articleVideo,
  articleExtras,
  authorProfile,
  clientTester,
  edition,
  fixtures,
  generateQueries,
  makeMocks,
  MockedProvider,
  MockFixture,
  providerTester,
  schemaToMocks,
  bookmarks,
  MockBookmarksProvider
};
