import React from "react";
import PropTypes from "prop-types";
import { AdComposer } from "@times-components/ad";

const ArticleContent = ({ section, children }) => (
  <AdComposer section={section}>{children}</AdComposer>
);

ArticleContent.propTypes = {
  section: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

ArticleContent.defaultProps = {
  section: "article"
};

export default ArticleContent;
