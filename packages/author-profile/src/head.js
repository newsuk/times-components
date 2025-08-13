import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { renderTreeArrayAsText } from "@times-components/markup-forest";

import { propTypes as authorProfileHeadPropTypes } from "./author-profile-head-prop-types";
import DualMasthead from "../assets/dual-masthead.png";

function Head({ metaDescription, description, name, slug, articles }) {
  let content = `Get up to date information and read all the latest articles from ${name}.`;

  if (metaDescription) {
    content = metaDescription;
  } else if (description && description.length) {
    content = renderTreeArrayAsText(description).substring(0, 200);
  }
  const hostName = "https://www.thetimes.com";

  return (
    <Helmet>
      <title>{name} | The Times &amp; The Sunday Times</title>
      <meta content={content} name="description" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "CollectionPage",
          publisher: {
            "@type": "Organization",
            name: "The Times",
            logo: {
              "@type": "ImageObject",
              url: DualMasthead,
              width: "600",
              height: "315"
            }
          },

          headline: name,
          description: content,
          url: `${hostName}/profile/${slug}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: articles.map((article, index) => ({
              "@type": "ListItem",
              url: article.url,
              position: index + 1
            }))
          },
          isAccessibleForFree: true,
          articleSection: "author profile page"
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
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string
    })
  )
};

Head.defaultProps = {
  metaDescription: null,
  slug: "",
  articles: []
};

export default Head;
