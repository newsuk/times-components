import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

function Head({ name }) {
  return (
    <Helmet>
      <title>{name} | The Times &amp; The Sunday Times</title>
      <meta
        content={`Get up to date information and read all the latest articles from ${name}.`}
        name="description"
      />
    </Helmet>
  );
}

Head.propTypes = {
  name: PropTypes.string.isRequired
};

export default Head;
