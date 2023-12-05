import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { renderTreeArrayAsText } from "@times-components/markup-forest";

import { propTypes as authorProfileHeadPropTypes } from "./author-profile-head-prop-types";

function Head({ metaDescription, description, name }) {
  let content = `Get up to date information and read all the latest articles from ${name}.`;

  if (metaDescription) {
    content = metaDescription;
  } else if (description && description.length) {
    content = renderTreeArrayAsText(description).substring(0, 200);
  }

  return (
    <Helmet>
      <title>{name} | The Times &amp; The Sunday Times</title>
      <meta content={content} name="description" />
    </Helmet>
  );
}

Head.propTypes = {
  metaDescription: PropTypes.string,
  description: authorProfileHeadPropTypes.biography.isRequired,
  name: PropTypes.string.isRequired
};

Head.defaultProps = {
  metaDescription: null
};

export default Head;
