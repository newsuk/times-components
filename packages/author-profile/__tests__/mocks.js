import { fixtureGenerator } from "@times-components/provider-test-tools";
import longSummaryLength from "../author-profile-constants";

export const pageSize = 3;
export const mockArticles = fixtureGenerator.makeArticleMocks({
  pageSize: 3,
  withImages: true
});
export const mockArticlesWithoutImages = fixtureGenerator.makeArticleMocks({
  longSummaryLength,
  pageSize: 3,
  withImages: false
});
export const mockAuthor = fixtureGenerator.makeAuthor({ withImages: true });
export const mockAuthorWithoutImages = fixtureGenerator.makeAuthor({
  withImages: false
});

export const props = {
  analyticsStream: () => {},
  author: mockAuthor,
  fetchMore: () => {},
  isLoading: false,
  onArticlePress: () => {},
  onTwitterLinkPress: () => {},
  page: 1,
  pageSize: 3,
  refetch: () => {},
  slug: "deborah-haynes"
};
