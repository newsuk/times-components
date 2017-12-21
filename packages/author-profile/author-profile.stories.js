import React from "react";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { decorateAction } from "@storybook/addon-actions";
import { AuthorProfileProvider } from "@times-components/provider";
import { MockedProvider } from "@times-components/utils/graphql";
import storybookReporter from "@times-components/tealium/storybook";
import AuthorProfile from "./author-profile";
import AuthorProfileContent from "./author-profile-content";
import {
  makeAuthor,
  makeArticleMocks,
  makeBrokenMocks,
  makeMocksWithAuthorError,
  makeMocksWithPageError
} from "./fixtures/fixture-generator";

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

const slug = "deborah-haynes";
const pageSize = 5;

storiesOf("AuthorProfile", module)
  .add("Default with images", () => {
    const props = {
      slug,
      author: makeAuthor({ withImages: true }),
      articleImageRatio: "3:2",
      isLoading: false,
      page: 2,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return (
      <MockedProvider
        mocks={makeArticleMocks({ withImages: true, slug, pageSize })}
      >
        <AuthorProfile {...props} />
      </MockedProvider>
    );
  })
  .add("Default without images", () => {
    const props = {
      slug: "deborah-haynes",
      author: makeAuthor(),
      articleImageRatio: "3:2",
      isLoading: false,
      page: 2,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return (
      <MockedProvider mocks={makeArticleMocks({ pageSize })}>
        <AuthorProfile {...props} />
      </MockedProvider>
    );
  })
  .add("Loading", () => {
    const props = {
      isLoading: true,
      articlesLoading: true,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter,
      refetch: () => {}
    };

    return <AuthorProfileContent {...props} />;
  })
  .add("With an error getting author", () => (
    <MockedProvider
      mocks={makeMocksWithAuthorError({ slug, pageSize, withImages: true })}
    >
      <AuthorProfileProvider slug={slug}>
        {({ author, isLoading, error, refetch }) => (
          <AuthorProfile
            author={author}
            page={1}
            refetch={refetch}
            pageSize={pageSize}
            slug={slug}
            isLoading={isLoading}
            error={error}
            onTwitterLinkPress={preventDefaultedAction("onTwitterLinkPress")}
            onArticlePress={preventDefaultedAction("onArticlePress")}
            analyticsStream={storybookReporter}
          />
        )}
      </AuthorProfileProvider>
    </MockedProvider>
  ))
  .add("With an error getting articles", () => {
    const props = {
      slug,
      author: makeAuthor({ withImages: true }),
      isLoading: false,
      page: 1,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return (
      <MockedProvider
        mocks={makeMocksWithPageError({ withImages: true, pageSize })}
      >
        <AuthorProfile {...props} />
      </MockedProvider>
    );
  })
  .add("With an error rendering a card", () => {
    const props = {
      slug,
      author: makeAuthor({ withImages: true }),
      articleImageRatio: "3:2",
      isLoading: false,
      page: 1,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return (
      <MockedProvider mocks={makeBrokenMocks({ withImages: true, pageSize })}>
        <AuthorProfile {...props} />
      </MockedProvider>
    );
  })
  .add("With Provider and Tracking", () => {
    const props = {
      slug,
      page: 2,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return (
      <MockedProvider mocks={makeArticleMocks({ withImages: true, pageSize })}>
        <AuthorProfileProvider slug={slug}>
          {({ author, isLoading, error }) => (
            <AuthorProfile
              author={author}
              isLoading={isLoading}
              error={error}
              {...props}
            />
          )}
        </AuthorProfileProvider>
      </MockedProvider>
    );
  });
