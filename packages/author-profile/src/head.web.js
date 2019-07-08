import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { getMetaContent } from "@times-components/utils";

import { propTypes as authorProfileHeadPropTypes } from "./author-profile-head-prop-types";

const Head = ({ metaContent, name }) => {
  const content = metaContent
    ? getMetaContent(metaContent)
    : `Get up to date information and read all the latest articles from ${name}.`;
  return (
    <Helmet>
      <title>{name} | The Times &amp; The Sunday Times</title>
      <meta content={content} name="description" />
    </Helmet>
  );
};

Head.propTypes = {
  metaContent: authorProfileHeadPropTypes.biography.isRequired,
  name: PropTypes.string.isRequired
};

export default Head;
