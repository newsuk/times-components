import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import Context from "@times-components/context";

function Head({ name, slug }) {
  return (
    <Context.Consumer>
      {({ makeTopicUrl }) => (
        <Helmet>
          <title>{name} | The Times &amp; The Sunday Times</title>
          <meta
            content={`Discover expert ${name} articles from The Times and The Sunday Times.`}
            name="description"
          />
          <link href={makeTopicUrl({ slug })} rel="canonical" />
        </Helmet>
      )}
    </Context.Consumer>
  );
}

Head.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

export default Head;
