/* eslint-disable import/no-unresolved */

const React = require("react");
const { ApolloProvider } = require("react-apollo");
const { HelmetProvider } = require("react-helmet-async");
const { getSectionNameForAnalytics } = require("@times-components/utils/rnw");
const { getSectionFromTiles } = require("@times-components/utils/rnw");
const { ArticleProvider } = require("@times-components/provider/rnw");
const { DraftArticleProvider } = require("@times-components/provider/rnw");
const Article = require("@times-components/article/rnw").default;
const {
  ContextProviderWithDefaults,
  defaults
} = require("@times-components/context/rnw");
const { scales, themeFactory } = require("@times-components/ts-styleguide/rnw");
const {
  affiliateLinksValidation
} = require("../lib/affiliate-links-validation");

const scale = scales.large;

const fetchSkimlinksDomains = async () => {
  // eslint-disable-next-line no-console
  console.log("Starting fetch...");
  const response = await fetch(
    "https://ads.thesun.co.uk/skimlinks/domains.json"
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  // eslint-disable-next-line no-console
  console.log("Fetched Data:", data);

  return data;
};

module.exports = (client, analyticsStream, data, helmetContext) => {
  const {
    articleId,
    debounceTimeMs,
    logoUrl,
    makeArticleUrl,
    makeTopicUrl,
    navigationMode,
    commentingConfig,
    articleDataFromRender,
    getCookieValue,
    userState,
    paidContentClassName,
    isPreview,
    swgProductId,
    getFallbackThumbnailUrl169,
    zephrDivs,
    sharingSavingFlag,
    commentingFlag,
    showAudioPlayer,
    storefrontConfig,
    isEntitlementFeatureEnabled
  } = data;

  const skimlinksDomains = fetchSkimlinksDomains();

  return React.createElement(
    HelmetProvider,
    { context: helmetContext },
    React.createElement(
      ApolloProvider,
      { client },
      React.createElement(
        isPreview ? DraftArticleProvider : ArticleProvider,
        {
          analyticsStream,
          debounceTimeMs,
          id: articleId
        },
        providerData => {
          const { isLoading, error, refetch } = providerData;
          const article = isPreview
            ? providerData.draftArticle
            : providerData.article;
          const articleTemplate = article ? article.template : null;
          const articleContent = affiliateLinksValidation(
            article.content,
            articleDataFromRender,
            skimlinksDomains
          );

          const formattedArticle = { ...article, content: articleContent };

          // eslint-disable-next-line no-console
          console.log("Article: ", article, articleDataFromRender);

          // eslint-disable-next-line no-console
          console.log("Formatted Article: ", formattedArticle);

          return React.createElement(
            ContextProviderWithDefaults,
            {
              value: {
                getCookieValue,
                makeArticleUrl,
                makeTopicUrl,
                theme: {
                  ...themeFactory(
                    article ? getSectionFromTiles(article) : "",
                    articleTemplate
                  ),
                  scale: scale || defaults.theme.scale
                },
                user: userState
              }
            },
            React.createElement(Article, {
              analyticsStream,
              article: {
                ...formattedArticle,
                section: article
                  ? getSectionNameForAnalytics(article)
                  : "unknown section",
                isSavingEnabled: sharingSavingFlag,
                isSharingEnabled: sharingSavingFlag,
                isCommentEnabled: commentingFlag,
                isEntitlementFeatureEnabled,
                isPreview
              },
              error,
              isLoading,
              logoUrl,
              navigationMode,
              onAuthorPress: () => {},
              onRelatedArticlePress: () => {},
              onTopicPress: () => {},
              refetch,
              commentingConfig,
              articleDataFromRender,
              paidContentClassName,
              isPreview,
              swgProductId,
              getFallbackThumbnailUrl169,
              zephrDivs,
              showAudioPlayer,
              storefrontConfig
            })
          );
        }
      )
    )
  );
};
