import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

function Head({ page, pageSize, name }) {
  return (
    <Helmet>
      <title>
        {name} | Page {`${page}/${pageSize}`} | The Times &amp; The Sunday Times
      </title>
    </Helmet>
  );
}

Head.propTypes = {
  name: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default Head;
