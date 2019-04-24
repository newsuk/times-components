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
    acc.push(...byline.byline);
    return acc;
  }, []);

  return renderTreeAsText({ children });
}

const PUBLICATION_NAMES = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

function Head({ article }) {
  const {
    descriptionMarkup,
    headline,
    leadAsset,
    publicationName,
    shortHeadline
  } = article;
  const publication = PUBLICATION_NAMES[publicationName];
  const authorName = getAuthorAsText(article);
  const desc =
    descriptionMarkup && renderTreeAsText({ children: descriptionMarkup });
  const sectionname = getSectionName(article);
  const leadassetUrl = get(leadAsset, "crop169.url", null);
  const title = headline || shortHeadline;

  return (
    <Context.Consumer>
      {({ makeArticleUrl }) => (
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
          {leadassetUrl && <meta content={leadassetUrl} property="og:image" />}

          <meta content={title} name="twitter:title" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content={makeArticleUrl(article)} name="twitter:url" />
          {desc && <meta content={desc} name="twitter:description" />}
          {leadassetUrl && <meta content={leadassetUrl} name="twitter:image" />}
        </Helmet>
      )}
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
  }).isRequired
};

export default Head;
