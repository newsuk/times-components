import React from "react";
import get from "lodash.get";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import { renderTreeAsText } from "@times-components/markup-forest";

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

function appendToUrl(uriString, key, value) {
  if (!uriString || !key || !value) {
    return uriString;
  }

  if (uriString.includes(`?${key}`) || uriString.includes(`&${key}`)) {
    return uriString;
  }

  let url;
  try {
    url = new URL(uriString);
  } catch (e) {
    return uriString;
  }

  if (url.search) {
    return `${uriString}&${key}=${value}`;
  }

  return `${uriString}?${key}=${value}`;
}

const PUBLICATION_NAMES = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

const getThumbnailUrlFromVideo = article =>
  get(article.leadAsset.posterImage, "crop169.url", null);

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

function Head({ article, paidContentClassName, faviconUrl }) {
  const {
    descriptionMarkup,
    headline,
    leadAsset,
    publicationName,
    shortHeadline,
    publishedTime,
    updatedTime,
    hasVideo
  } = article;

  const publication = PUBLICATION_NAMES[publicationName];
  const authorName = getAuthorAsText(article);
  const desc =
    Array.isArray(descriptionMarkup) && descriptionMarkup.length
      ? renderTreeAsText({ children: descriptionMarkup })
      : null;
  const sectionname = getSectionName(article);
  const leadassetUrl = appendToUrl(
    get(leadAsset, "crop169.url", null),
    "resize",
    685
  );
  const caption = get(leadAsset, "caption", null);
  const title = headline || shortHeadline;
  const datePublished = new Date(publishedTime).toISOString().split("T")[0];
  const thumbnailUrl = hasVideo
    ? getThumbnailUrlFromVideo(article)
    : getThumbnailUrlFromImage(article);

  const jsonLD = {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    headline: title,
    publisher: {
      "@type": "Organization",
      name: publication,
      logo: faviconUrl
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
    thumbnailUrl
  };

  if (updatedTime) {
    jsonLD.dateUpdated = updatedTime;
  }

  return (
    <Context.Consumer>
      {({ makeArticleUrl }) => {
        jsonLD.mainEntityOfPage["@id"] = makeArticleUrl(article);
        return (
          <Helmet>
            <title>
              {title} | {sectionname ? `${sectionname} | ` : ""}
              {publication}
            </title>
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
  paidContentClassName: PropTypes.string.isRequired,
  faviconUrl: PropTypes.string.isRequired
};

export default Head;
