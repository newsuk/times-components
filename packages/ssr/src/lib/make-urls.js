module.exports.makeArticleUrl = ({ id }) =>
  `http://localhost:3000/article/${id}`;
module.exports.makeTopicUrl = ({ slug }) => `/topic/${slug}`;
