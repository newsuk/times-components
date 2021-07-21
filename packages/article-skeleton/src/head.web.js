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

function getReducedBylines(bylines) {
  return bylines.reduce((acc, byline) => {
    if (Array.isArray(byline.byline)) {
      acc.push(...byline.byline);
    } else {
      acc.push(byline.byline);
    }
    return acc;
  }, []);
}

function getAuthorAsText(article) {
  const { bylines } = article;
  if (!bylines) {
    return null;
  }
  const children = getReducedBylines(bylines);
  return renderTreeAsText({ children });
}

function getAuthorsAndInlines(
  { children, name, attributes },
  type,
  values = { authors: [], inlines: [] }
) {
  if (children && children.length > 0) {
    const subschildren = [...children];
    if (name === "author") {
      subschildren[0].attributes.slug = attributes;
    }

    subschildren.map(child => getAuthorsAndInlines(child, name, values));
  } else {
    if (type === "inline") values.inlines.push(attributes);
    if (type === "author") values.authors.push(attributes);
  }
  return values;
}

function removePipeandComma(value) {
  if (!value) return "";
  return value
    .replace(/,/g, "")
    .replace(/\|/g, "")
    .trim();
}

function getAuthorSchema(article) {
  const { bylines } = article;
  if (!bylines) {
    return null;
  }

  const children = getReducedBylines(bylines);
  let { authors, inlines } = getAuthorsAndInlines({ children });

  authors = authors.map(author => ({
    ...author,
    value: removePipeandComma(author.value)
  }));
  inlines = inlines.map(inline => ({
    ...inline,
    value: removePipeandComma(inline.value)
  }));
  return authors
    .map(({ value, slug: { slug: slugValue } }, index) => ({
      name: value,
      jobTitle: inlines.length > index ? inlines[index].value : "",
      slug: slugValue
    }))
    .map(({ name, jobTitle }) => ({
      "@type": "Person",
      name,
      jobTitle
    }));
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

function Head({ article, logoUrl, paidContentClassName }) {
  const {
    descriptionMarkup,
    headline,
    leadAsset,
    publicationName,
    shortHeadline,
    publishedTime,
    updatedTime,
    hasVideo,
    seoDescription
  } = article;

  const publication = PUBLICATION_NAMES[publicationName];
  const authorName = getAuthorAsText(article);
  const desc =
    seoDescription ||
    (Array.isArray(descriptionMarkup) && descriptionMarkup.length
      ? renderTreeAsText({ children: descriptionMarkup })
      : null);
  const sectionname = getSectionName(article);
  const leadassetUrl = appendToImageURL(
    getArticleLeadAssetUrl(article),
    "resize",
    685
  );
  const authors = getAuthorSchema(article);
  const caption = get(leadAsset, "caption", null);
  const title = headline || shortHeadline || "";
  const datePublished = new Date(publishedTime).toISOString();
  const dateModified = updatedTime || datePublished;
  const thumbnailUrl = hasVideo
    ? getVideoLeadAssetUrl(article)
    : getThumbnailUrlFromImage(article);

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
    dateModified
  };

  Object.assign(jsonLD, authors && authors.length ? { author: authors } : {});
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
  logoUrl: PropTypes.string.isRequired,
  paidContentClassName: PropTypes.string.isRequired
};

export default Head;
