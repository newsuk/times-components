import * as React from "react";
import { NativeModules } from "react-native";
import PropTypes from "prop-types";
import AuthorProfile from "@times-components/author-profile";
import { AuthorProfileProvider } from "@times-components/provider";
import withNativeProvider from "../with-native-provider";

const { track } = NativeModules.ReactAnalytics;
const {
  onArticlePress,
  onTwitterLinkPress
} = NativeModules.AuthorProfileEvents;

const AuthorProfilePage = ({ authorSlug }) => {
  const AuthorProfileView = withNativeProvider(
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
          analyticsStream={track}
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
  return <AuthorProfileView />;
};

AuthorProfilePage.propTypes = {
  authorSlug: PropTypes.string.isRequired
};

export default AuthorProfilePage;
