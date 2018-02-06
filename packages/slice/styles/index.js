import relatedArticlesDefaultStyles from "./related-articles.default.styles.js";

const templateStyles = {
  relatedArticlesDefaultStyles
};

export default template => {
  const stylesObjectName = `${template.domain}${template.type}Styles`;
  return templateStyles[stylesObjectName];
};
