export default template => ({
  domain: "relatedArticles",
  type: template.charAt(0).toUpperCase() + template.slice(1).toLowerCase()
});
