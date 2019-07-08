import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { getMetaContent } from "@times-components/utils"

const Head = ({ description, name }) => {
  const content = description ? getMetaContent(description) : `Get up to date information and read all the latest articles from ${name}.`
  return (
    <Helmet>
      <title>{name} | The Times &amp; The Sunday Times</title>
      <meta
        content={content}
        name="description"
      />
    </Helmet>
  );
}

Head.propTypes = {
  description: PropTypes.array,
  name: PropTypes.string.isRequired
};

export default Head;
