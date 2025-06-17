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

const scale = scales.large;

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
    showAudioPlayer,
    removeTeaserContent
  } = data;

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

          const sectionPath = article ? getSectionNameForAnalytics(article) : "";


// --- Inline section transformation ---
const sectionData = {};
if (sectionPath) {
  const cleanRoute = sectionPath.replace(/^\/|\/$/g, '');
  const parts = cleanRoute
    .split('/')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1));

  let cumulative = '';
  parts.forEach((part, index) => {
    cumulative = cumulative ? `${cumulative}:${part}` : part;
    const key = index === 0 ? 'page_section' : `page_section_${index + 1}`;
    sectionData[key] = cumulative;
  });
}


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
                ...article,
                section: sectionPath || "unknown section",
    isPreview,
    ...sectionData // ✅ Add page_section/page_section_2/etc. here
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
              removeTeaserContent
            })
          );
        }
      )
    )
  );
};
