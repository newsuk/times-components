import React from "react";
import ArticleList, {
  ArticleListPageError
} from "@times-components/article-list";
import {
  AuthorArticlesNoImagesProvider,
  AuthorArticlesWithImagesProvider
} from "@times-components/provider";
import Responsive from "@times-components/responsive";
import AuthorProfileHead from "./author-profile-head";
import { propTypes, defaultProps } from "./author-profile-prop-types";
import Head from "./head";

const AuthorProfile = ({
  author,
  error,
  isLoading: isHeaderLoading,
  onTwitterLinkPress,
  page,
  pageSize: initPageSize,
  refetch,
  slug,
  metaDescription
}) => {
  if (error) {
    return <ArticleListPageError refetch={refetch} />;
  }

  const {
    biography,
    hasLeadAssets = true,
    image: uri,
    jobTitle,
    name,
    twitter,
    contractualTitle
  } = isHeaderLoading
    ? {
        articles: [],
        image: "",
        jobTitle: "",
        name: "",
        twitter: "",
        contractualTitle: ""
      }
    : author;

  const articleListHeader = (
    <AuthorProfileHead
      biography={biography}
      isLoading={isHeaderLoading}
      jobTitle={jobTitle}
      name={name}
      onTwitterLinkPress={onTwitterLinkPress}
      twitter={twitter}
      uri={uri}
      contractualTitle={contractualTitle}
    />
  );

  const SelectedProvider = hasLeadAssets
    ? AuthorArticlesWithImagesProvider
    : AuthorArticlesNoImagesProvider;

  return (
    <SelectedProvider
      articleImageRatio="3:2"
      debounceTimeMs={250}
      page={page}
      pageSize={initPageSize}
      slug={slug}
    >
      {() => (
        <Responsive>
          <Head
            metaDescription={metaDescription}
            description={biography}
            name={name}
          />
          <ArticleList articleListHeader={articleListHeader} />
        </Responsive>
      )}
    </SelectedProvider>
  );
};

AuthorProfile.propTypes = propTypes;
AuthorProfile.defaultProps = defaultProps;

export default AuthorProfile;
