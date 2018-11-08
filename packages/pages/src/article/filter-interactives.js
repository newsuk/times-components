export default article =>
  article
    ? {
        ...article,
        content: article.content.filter(node => node.name !== "interactive")
      }
    : article;
