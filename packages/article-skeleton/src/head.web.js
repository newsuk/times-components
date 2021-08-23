import React from "react";
import get from "lodash.get";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import { renderTreeAsText } from "@times-components/markup-forest";
import { appendToImageURL } from "@times-components/utils";

// Get the section for an article, preferring it not to be News
function getSectionName(article) {
  const { tiles } = article;

  if (!tiles) {
    return null;
  }

  const slices = tiles.reduce((acc, tile) => {
    acc.push(...tile.slices);
    return acc;
  }, []);
  const sections = slices.reduce((acc, slice) => {
    acc.push(...slice.sections);
    return acc;
  }, []);
  const titles = sections.map(section => section.title);

  if (titles.length === 0) {
    return null;
  }

  const nonNews = titles.filter(title => title !== "News");

  return nonNews.length ? nonNews[0] : "News";
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

function getAuthorSchema(article) {
  const { bylines } = article;
  return bylines
    ? getAuthors(article).map(({ name, jobTitle, twitter, slug }) => {
        const url = `https://thetimes.co.uk/profile/${slug}`;
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

function Head({
  article,
  logoUrl,
  paidContentClassName,
  getFallbackThumbnailUrl169
}) {
  const {
    descriptionMarkup,
    headline,
    leadAsset,
    publicationName,
    shortHeadline,
    publishedTime,
    updatedTime,
    hasVideo,
    seoDescription,
    url
  } = article;

  const publication = PUBLICATION_NAMES[publicationName];
  const authorName = getAuthorAsText(article);
  const desc =
    seoDescription ||
    (Array.isArray(descriptionMarkup) && descriptionMarkup.length
      ? renderTreeAsText({ children: descriptionMarkup })
      : null);
  const sectionname = getSectionName(article);
  const thumbnailUrl =
    getThumbnailUrl(article) ||
    (getFallbackThumbnailUrl169 ? getFallbackThumbnailUrl169() : null);

  const leadassetUrl =
    appendToImageURL(getArticleLeadAssetUrl(article), "resize", 1200) ||
    thumbnailUrl;
  const authors = getAuthorSchema(article);
  const caption = get(leadAsset, "caption", null);
  const title = headline || shortHeadline || "";
  const datePublished = new Date(publishedTime).toISOString();
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
  const jsonLD = {
    "@context": "http://schema.org",
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
      "@type": "WebPage"
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
    author: authorSchema
  };

  const videoJsonLD = hasVideo
    ? {
        "@context": "https://schema.org/",
        "@type": "VideoObject",
        name: leadAsset.title || title,
        uploadDate: dateModified,
        thumbnailUrl,
        description:
          Array.isArray(descriptionMarkup) && descriptionMarkup.length
            ? renderTreeAsText({ children: descriptionMarkup })
            : seoDescription || leadAsset.title || title,
        contentUrl: url
      }
    : null;

  return (
    <Context.Consumer>
      {({ makeArticleUrl }) => {
        jsonLD.mainEntityOfPage["@id"] = makeArticleUrl(article);
        return (
          <Helmet encodeSpecialCharacters={false}>
            <title>
              {title} | {sectionname ? `${sectionname} | ` : ""}
              {publication}
            </title>
            <meta name="robots" content="max-image-preview:large" />
            <meta content={title} name="article:title" />
            <meta content={publication} name="article:publication" />
            {desc && <meta content={desc} name="description" />}
            {authorName && <meta content={authorName} name="author" />}

            <meta content={title} property="og:title" />
            <meta content="article" property="og:type" />
            <meta content={makeArticleUrl(article)} property="og:url" />
            {desc && <meta content={desc} property="og:description" />}
            {leadassetUrl && (
              <meta content={leadassetUrl} property="og:image" />
            )}

            <meta content={title} name="twitter:title" />
            <meta content="summary_large_image" name="twitter:card" />
            <meta content={makeArticleUrl(article)} name="twitter:url" />
            {desc && <meta content={desc} name="twitter:description" />}
            {leadassetUrl && (
              <meta content={leadassetUrl} name="twitter:image" />
            )}
            <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>
            {videoJsonLD && (
              <script type="application/ld+json">
                {JSON.stringify(videoJsonLD)}
              </script>
            )}
          </Helmet>
        );
      }}
    </Context.Consumer>
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
  logoUrl: PropTypes.string.isRequired,
  paidContentClassName: PropTypes.string.isRequired,
  getFallbackThumbnailUrl169: PropTypes.func.isRequired
};

export default Head;
