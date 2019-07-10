import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { renderTreeArrayAsText } from "@times-components/markup-forest";

import { propTypes as authorProfileHeadPropTypes } from "./author-profile-head-prop-types";

function Head({ description, name }) {
  const content =
    description && description.length
      ? renderTreeArrayAsText(description).substring(0, 200)
      : `Get up to date information and read all the latest articles from ${name}.`;
  return (
    <Helmet>
      <title>{name} | The Times &amp; The Sunday Times</title>
      <meta content={content} name="description" />
    </Helmet>
  );
}

Head.propTypes = {
  description: authorProfileHeadPropTypes.biography.isRequired,
  name: PropTypes.string.isRequired
};

export default Head;
