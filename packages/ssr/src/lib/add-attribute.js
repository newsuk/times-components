module.exports.addAttribute = article => ({
  ...article,
  content: [...article.content.slice(0, 2)],
  ssrAttr: "new-ssr-attr"
});
