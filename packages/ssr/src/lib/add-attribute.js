module.exports.addAttribute = article => ({
  ...article,
  content: [...article.content[0], ...article.content[1]]
});
