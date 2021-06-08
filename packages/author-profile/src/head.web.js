import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { renderTreeArrayAsText } from "@times-components/markup-forest";

import { propTypes as authorProfileHeadPropTypes } from "./author-profile-head-prop-types";

function Head({ description, name }) {
  let content = `Get up to date information and read all the latest articles from ${name}.`;

  if (description && typeof description === "object") {
    content = renderTreeArrayAsText(description).substring(0, 200);
  } else if (description && typeof description === "string"){
    content = description;
  }

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
