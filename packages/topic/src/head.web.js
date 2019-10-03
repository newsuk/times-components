import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import Context from "@times-components/context";
import { renderTreeArrayAsText } from "@times-components/markup-forest";

import { propTypes as topicHeadPropTypes } from "./topic-head-prop-types";

function Head({ description, name, slug }) {
  const content =
    description && description.length
      ? renderTreeArrayAsText(description).substring(0, 200)
      : `Discover expert ${name} articles from The Times and The Sunday Times.`;

  return (
    <Context.Consumer>
      {({ makeTopicUrl }) => (
        <Helmet>
          <title>{name} | The Times &amp; The Sunday Times</title>
          <meta content={content} name="description" />
          <link href={makeTopicUrl({ slug })} rel="canonical" />
        </Helmet>
      )}
    </Context.Consumer>
  );
}

Head.propTypes = {
  description: topicHeadPropTypes.description.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

export default Head;
