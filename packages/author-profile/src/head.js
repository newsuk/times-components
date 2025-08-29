import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { renderTreeArrayAsText } from "@times-components/markup-forest";

import { propTypes as authorProfileHeadPropTypes } from "./author-profile-head-prop-types";

function Head({ metaDescription, description, name, slug, jobTitle, uri }) {
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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            description: content,
            image: uri,
            jobTitle,
            name,
            url: `https://www.thetimes.com/profile/${slug}`
          }
        })}
      </script>
    </Helmet>
  );
}

Head.propTypes = {
  metaDescription: PropTypes.string,
  description: authorProfileHeadPropTypes.biography.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string,
  jobTitle: PropTypes.string,
  uri: PropTypes.string
};

Head.defaultProps = {
  metaDescription: null,
  slug: "",
  jobTitle: "",
  uri: ""
};

export default Head;
