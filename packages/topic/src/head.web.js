import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import Context from "@times-components/context";
import { renderTreeArrayAsText } from "@times-components/markup-forest";
import appendToUrl from "../../utils/src/append-to-image-url";

import { propTypes as topicHeadPropTypes } from "./topic-head-prop-types";

import { defaultProps } from "./topic-prop-types";

function Head({ description, name, slug, page, articleCount, pageSize }) {
  const totalPages =
    articleCount && pageSize ? Math.ceil(articleCount / pageSize) : 0;
  const content = (description && description.length
    ? renderTreeArrayAsText(description).substring(0, 200)
    : `Discover expert ${name} articles from The Times and The Sunday Times.`
  ).concat(` Page ${page} of ${totalPages}`);

  let title = `${name} | The Times & The Sunday Times`;
  title += page && page > 1 ? ` | Page ${page}` : "";

  return (
    <Context.Consumer>
      {({ makeTopicUrl }) => (
        <Helmet>
          <title>{title}</title>
          <meta content={content} name="description" />
          <link
            href={
              page && page > 1
                ? appendToUrl(makeTopicUrl({ slug }), "page", page)
                : makeTopicUrl({ slug })
            }
            rel="canonical"
          />
        </Helmet>
      )}
    </Context.Consumer>
  );
}

Head.propTypes = {
  description: topicHeadPropTypes.description.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  page: PropTypes.number,
  articleCount: PropTypes.number,
  pageSize: PropTypes.number
};

Head.defaultProps = {
  ...defaultProps,
  articleCount: defaultProps.page * defaultProps.pageSize
};

export default Head;
