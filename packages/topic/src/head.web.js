import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import Context from "@times-components/context";
import { getMetaContent } from "@times-components/utils";

import { propTypes as topicHeadPropTypes } from "./topic-head-prop-types";

const Head = ({ metaContent, name, slug }) => {
  const content = metaContent
    ? getMetaContent(metaContent)
    : `Discover expert ${name} articles from The Times and The Sunday Times.`;
  return (
    <Context.Consumer>
      {({ makeTopicUrl }) => (
        <Helmet>
          <title>{name} | The Times &amp; The Sunday Times</title>
          <meta
            content={
              content ||
              `Discover expert ${name} articles from The Times and The Sunday Times.`
            }
            name="description"
          />
          <link href={makeTopicUrl({ slug })} rel="canonical" />
        </Helmet>
      )}
    </Context.Consumer>
  );
};

Head.propTypes = {
  metaContent: topicHeadPropTypes.description.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

export default Head;
