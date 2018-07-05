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
    slug={authorSlug}
    page={1}
    pageSize={20}
    debounceTimeMs={250}
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
        author={author}
        slug={authorSlug}
        isLoading={isLoading}
        analyticsStream={analyticsStream}
        error={error}
        page={page}
        pageSize={pageSize}
        refetch={refetch}
        onTwitterLinkPress={(event, extras) => onTwitterLinkPress(extras.url)}
        onArticlePress={(event, extras) => onArticlePress(extras.url)}
        onNext={onNext}
        onPrev={onPrev}
      />
    )}
  </AuthorProfileProvider>
);

AuthorProfilePage.propTypes = {
  authorSlug: PropTypes.string.isRequired,
  analyticsStream: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onArticlePress: PropTypes.func.isRequired
};

export default withClient(AuthorProfilePage);
