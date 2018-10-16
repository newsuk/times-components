import * as React from "react";
import PropTypes from "prop-types";
import AuthorProfile from "@times-components/author-profile";
import { AuthorProfileProvider } from "@times-components/provider";
import withClient from "./client/with-client";

const AuthorProfilePage = ({
  authorSlug,
  onTwitterLinkPress,
  onArticlePress,
  analyticsStream
}) => (
  <AuthorProfileProvider
    articleImageRatio="4:3"
    debounceTimeMs={250}
    page={1}
    pageSize={20}
    slug={authorSlug}
  >
    {({
      author,
      isLoading,
      error,
      page,
      pageSize,
      onNext,
      onPrev,
      refetch
    }) => (
      <AuthorProfile
        analyticsStream={analyticsStream}
        author={author}
        error={error}
        isLoading={isLoading}
        onArticlePress={(event, extras) => onArticlePress(extras.url)}
        onNext={onNext}
        onPrev={onPrev}
        onTwitterLinkPress={(event, extras) => onTwitterLinkPress(extras.url)}
        page={page}
        pageSize={pageSize}
        refetch={refetch}
        slug={authorSlug}
      />
    )}
  </AuthorProfileProvider>
);

AuthorProfilePage.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  authorSlug: PropTypes.string.isRequired,
  onArticlePress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired
};

export default withClient(AuthorProfilePage);
