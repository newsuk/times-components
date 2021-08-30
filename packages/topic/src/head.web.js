import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import Context from "@times-components/context";
import { renderTreeArrayAsText } from "@times-components/markup-forest";

import { propTypes as topicHeadPropTypes } from "./topic-head-prop-types";

function Head({ metaDescription, description, name, slug }) {
  let content = `Discover expert ${name} articles from The Times and The Sunday Times.`;

  if (metaDescription) {
    content = metaDescription;
  } else if (description && description.length) {
    content = renderTreeArrayAsText(description).substring(0, 200);
  }

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
  metaDescription: PropTypes.string,
  description: topicHeadPropTypes.description.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

Head.defaultProps = {
  metaDescription: null
};

export default Head;
