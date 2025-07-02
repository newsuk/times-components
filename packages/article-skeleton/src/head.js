import React from "react";
import get from "lodash.get";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

import { renderTreeAsText } from "@times-components/markup-forest";
import { appendToImageURL } from "@times-components/utils";

const SYNDICATED_ARTICLE_IDS = ["37a19ac4-1cbb-11ee-8198-bf96b6365670"];

function getIsLiveBlogExpiryTime(articleFlags = []) {
  let time = "";
  if (articleFlags !== undefined) {
    for (let i = 0; i < articleFlags.length; i += 1) {
      if (articleFlags[i].type === "LIVE") {
        time = articleFlags[i].expiryTime;
      }
    }
  }
  return time;
}
function getIsLiveBlog(articleFlags = []) {
  if (articleFlags !== undefined) {
    const articleLiveFlag = articleFlags.find(
      flag =>
        flag.type === "LIVE" &&
        (Date.now() < new Date(flag.expiryTime) || flag.expiryTime === null)
    );
    return articleLiveFlag !== undefined;
  }
  return false;
}
function getAuthorAsText(article) {
  const { bylines } = article;
  if (!bylines) {
    return null;
  }
  const children = bylines.reduce((acc, byline) => {
    if (Array.isArray(byline.byline)) {
      acc.push(...byline.byline);
    } else {
      acc.push(byline.byline);
    }
    return acc;
  }, []);
  return renderTreeAsText({ children });
}

function getAuthors({ bylines }) {
  return bylines.map(byline => byline.author).filter(author => author);
}

function getAuthorSchema(article, domainSpecificUrl) {
  const { bylines } = article;
  return bylines
    ? getAuthors(article).map(({ name, jobTitle, twitter, slug }) => {
        const url = `${domainSpecificUrl}/profile/${slug}`;
        return {
          "@type": "Person",
          name,
          jobTitle,
          sameAs: twitter ? [url, `https://twitter.com/${twitter}`] : url
        };
      })
    : [];
}

const PUBLICATION_NAMES = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

const get169CropUrl = asset => get(asset, "crop169.url", null);

const getVideoLeadAssetUrl = article =>
  get169CropUrl(
    get(article, "leadAsset.posterImage", get(article, "leadAsset", null))
  );

const getImageLeadAssetUrl = article =>
  get169CropUrl(get(article, "leadAsset", null));

const getArticleLeadAssetUrl = article =>
  (article.hasVideo ? getVideoLeadAssetUrl : getImageLeadAssetUrl)(article);

const getThumbnailUrlFromImage = article => {
  const tileUrl =
    article.tiles &&
    article.tiles.find(tile => get(tile.leadAsset, "crop169.url", null));

  if (tileUrl) {
    return tileUrl;
  }

  const listingAssetUrl = get(article.listingAsset, "crop169.url", null);

  if (listingAssetUrl) {
    return listingAssetUrl;
  }

  return get(article.leadAsset, "crop169.url", null);
};

const getThumbnailUrl = article => {
  const { hasVideo, leadAsset } = article;
  const thumbnailUrl = hasVideo
    ? getVideoLeadAssetUrl(article)
    : getThumbnailUrlFromImage(article);

  if (thumbnailUrl) return thumbnailUrl;

  if (!leadAsset) return null;

  const { crop32, crop1251, crop11, crop45, crop23, crop2251 } =
    leadAsset && leadAsset.posterImage ? leadAsset.posterImage : leadAsset;
  const crop = crop32 || crop1251 || crop11 || crop45 || crop23 || crop2251;
  return crop ? crop.url : "";
};

const getLiveBlogUpdates = (article, publisher, author) => {
  const updates = [];
  if (article === null) {
    return updates;
  }
  const { content } = article;
  const anchorString = (updateTxt = "", headlineTxt = "") => {
    const onlyNumbersReg = /\D+/g;
    const onlyNumbers = updateTxt.replace(onlyNumbersReg, "");
    const acronymReg = /\b(\w)/g;
    const acronymMatch = headlineTxt.match(acronymReg);
    const acronym = acronymMatch === null ? "" : acronymMatch.join("");
    return `u_${onlyNumbers}${acronym}`;
  };

  if (content !== undefined) {
    let update;
    const loopContent = contentObj => {
      for (let i = 0; i < contentObj.length; i += 1) {
        if (contentObj[i].name === "interactive") {
          if (
            contentObj[i].attributes.element &&
            contentObj[i].attributes.element.value === "article-header"
          ) {
            if (update !== undefined) {
              updates.push(update);
            }
            const { attributes } = contentObj[i].attributes.element;
            update = {
              "@type": "BlogPosting",
              headline: attributes.headline,
              datePublished: attributes.updated,
              dateModified: attributes.updated,
              publisher,
              url: `${article.url}#${anchorString(
                attributes.updated,
                attributes.headline
              )}`,
              author
            };
          }
        } else if (contentObj[i].name === "paragraph") {
          if (update !== undefined) {
            const text = get(contentObj[i], "children[0].attributes.value", "");
            if (update.articleBody) {
              update.articleBody += ` ${text}`;
            } else {
              update.articleBody = text;
            }
          }
        } else if (contentObj[i].name === "image") {
          if (update !== undefined) {
            update.image = {
              "@type": "ImageObject",
              url: contentObj[i].attributes.url,
              caption: contentObj[i].attributes.caption
            };
          }
        } else if (contentObj[i].name === "video") {
          if (update !== undefined) {
            update.video = {
              "@type": "VideoObject",
              thumbnail: contentObj[i].attributes.posterImageUrl
            };
          }
        } else if (contentObj[i].name === "paywall") {
          if (contentObj[i].children) {
            if (contentObj[i].children.length > 0) {
              loopContent(contentObj[i].children);
            }
          }
        }
      }
    };
    loopContent(content);

    if (update !== undefined) {
      updates.push(update);
    }
  }

  return updates;
};

function Head({
  article,
  articleUrl,
  logoUrl,
  paidContentClassName,
  getFallbackThumbnailUrl169,
  swgProductId,
  breadcrumbs,
  domainSpecificUrl
}) {
  const {
    descriptionMarkup,
    headline,
    leadAsset,
    publicationName,
    shortHeadline,
    publishedTime,
    firstPublishedTime,
    updatedTime,
    hasVideo,
    seoDescription,
    keywords
  } = article;

  const { brightcoveAccountId, brightcoveVideoId } = leadAsset || {};
  const liveBlogArticleExpiry = getIsLiveBlogExpiryTime(article.expirableFlags);
  const isLiveBlogArticle = getIsLiveBlog(article.expirableFlags);
  const publication = PUBLICATION_NAMES[publicationName];
  const authorName = getAuthorAsText(article);
  const desc =
    seoDescription ||
    (Array.isArray(descriptionMarkup) && descriptionMarkup.length
      ? renderTreeAsText({ children: descriptionMarkup })
      : null);
  const thumbnailUrl =
    getThumbnailUrl(article) ||
    (getFallbackThumbnailUrl169 ? getFallbackThumbnailUrl169() : null);

  const leadassetUrl =
    appendToImageURL(getArticleLeadAssetUrl(article), "resize", 1200) ||
    thumbnailUrl;
  const authors = getAuthorSchema(article, domainSpecificUrl);
  const caption = get(leadAsset, "caption", null);
  const title = headline || shortHeadline || "";
  const datePublished = publishedTime && new Date(publishedTime).toISOString();
  const primaryCategory = article.associatedDesks
    ? article.associatedDesks[0]
    : "News";
  const deskSections = article.associatedDesks
    ? article.associatedDesks.map(deskSection => `Section:${deskSection}`)
    : [];
  const breadcrumbSections =
    breadcrumbs.length > 0
      ? breadcrumbs.map(breadcrumb => `Section:${breadcrumb.title}`)
      : [];
  const keywordsArr = deskSections.concat(breadcrumbSections);
  const categoryLabels =
    keywordsArr.length > 0 ? [...new Set(keywordsArr)].toString() : "";
  const dateModified = updatedTime || datePublished;

  const defaultAuthorSchema = {
    "@type": "Organization",
    name: "The Times"
  };
  const textByLineAuthorSchema = authorName
    ? { "@type": "Person", name: authorName }
    : null;
  const authorSchema =
    (authors && authors.length ? authors : textByLineAuthorSchema) ||
    defaultAuthorSchema;
  const publisherSchema = {
    "@type": "Organization",
    name: publication,
    logo: {
      "@type": "ImageObject",
      url: logoUrl
    }
  };
  const liveBlogUpdateSchema = getLiveBlogUpdates(
    article,
    publisherSchema,
    authorSchema
  );

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    publisher: {
      "@type": "Organization",
      name: publication,
      logo: {
        "@type": "ImageObject",
        url: logoUrl
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl
    },
    dateCreated: publishedTime,
    datePublished,
    isAccessibleForFree: false,
    hasPart: {
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: `.${paidContentClassName}`
    },
    image: {
      "@type": "ImageObject",
      url: leadassetUrl,
      caption
    },
    thumbnailUrl,
    dateModified,
    author: authorSchema,
    articleSection: primaryCategory,
    keywords: categoryLabels,
    url: articleUrl
  };

  if (swgProductId) {
    jsonLD.isPartOf = {
      "@type": ["CreativeWork", "Product"],
      name: "The Times & The Sunday Times",
      productID: swgProductId
    };
  }

  const videoJsonLD = hasVideo
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: leadAsset && leadAsset.title ? leadAsset.title : title,
        uploadDate: dateModified,
        thumbnailUrl,
        description:
          Array.isArray(descriptionMarkup) && descriptionMarkup.length
            ? renderTreeAsText({ children: descriptionMarkup })
            : seoDescription || leadAsset.title || title,
        contentUrl: `https://players.brightcove.net/${brightcoveAccountId}/default_default/index.html?videoId=${brightcoveVideoId}`
      }
    : null;

  const liveBlogJsonLD = {
    "@context": "https://schema.org",
    "@type": "LiveBlogPosting",
    headline,
    description: seoDescription,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl
    },
    datePublished: publishedTime,
    dateModified: updatedTime,
    coverageStartTime: firstPublishedTime,
    coverageEndTime: liveBlogArticleExpiry,
    url: articleUrl,
    keywords,
    image: {
      "@type": "ImageObject",
      url: leadassetUrl,
      caption
    },
    publisher: publisherSchema,
    author: authorSchema,
    liveBlogUpdate: liveBlogUpdateSchema,
    articleSection: primaryCategory
  };
  const isSyndicatedArticle = SYNDICATED_ARTICLE_IDS.includes(article.id);

  const breadcrumbJsonLD =
    breadcrumbs && breadcrumbs.length
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((breadcrumb, breadcrumbIndex) => ({
            "@type": "ListItem",
            position: breadcrumbIndex + 1,
            name: breadcrumb.title,
            item: `${domainSpecificUrl}${breadcrumb.url}`
          }))
        }
      : null;

  return (
    <Helmet encodeSpecialCharacters={false}>
      <title>{title}</title>
      {isSyndicatedArticle && <meta name="robots" content="noindex" />}
      <meta name="robots" content="max-image-preview:large" />
      <meta content={title} name="article:title" />
      <meta content={publication} name="article:publication" />
      {desc && <meta content={desc} name="description" />}
      {authorName && <meta content={authorName} name="author" />}

      <meta content={title} property="og:title" />
      <meta content="article" property="og:type" />
      <meta content={articleUrl} property="og:url" />
      {desc && <meta content={desc} property="og:description" />}
      {leadassetUrl && <meta content={leadassetUrl} property="og:image" />}
      {hasVideo && <meta name="robots" content="max-video-preview:-1" />}

      <meta content={title} name="twitter:title" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={articleUrl} name="twitter:url" />
      {desc && <meta content={desc} name="twitter:description" />}
      {leadassetUrl && <meta content={leadassetUrl} name="twitter:image" />}

      {isLiveBlogArticle && (
        <script type="application/ld+json">
          {JSON.stringify(liveBlogJsonLD)}
        </script>
      )}

      <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>

      {videoJsonLD && (
        <script type="application/ld+json">
          {JSON.stringify(videoJsonLD)}
        </script>
      )}

      {breadcrumbJsonLD && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLD)}
        </script>
      )}

      <script
        type="text/javascript"
        defer
        src="https://platform.twitter.com/widgets.js"
      />
    </Helmet>
  );
}

Head.propTypes = {
  article: PropTypes.shape({
    bylines: PropTypes.array,
    descriptionMarkup: PropTypes.array,
    headline: PropTypes.string,
    id: PropTypes.string.isRequired,
    leadAsset: PropTypes.object,
    publicationName: PropTypes.string.isRequired,
    shortHeadline: PropTypes.string,
    shortIdentifier: PropTypes.string.isRequired,
    tiles: PropTypes.array
  }).isRequired,
  articleUrl: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
  paidContentClassName: PropTypes.string.isRequired,
  getFallbackThumbnailUrl169: PropTypes.func.isRequired,
  swgProductId: PropTypes.string,
  domainSpecificUrl: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({}))
};

Head.defaultProps = {
  swgProductId: null,
  breadcrumbs: []
};

export default Head;
