import articleListFixture from "../fixtures/article-list.json";

export default (skip, first) => ({
  data: {
    author: {
      ...articleListFixture.data.author,
      articles: {
        ...articleListFixture.data.author.articles,
        list: articleListFixture.data.author.articles.list
          .map(el => ({
            ...el,
            publishedTime: new Date(el.publishedTime)
          }))
          .slice(skip, skip + first)
      }
    }
  }
});
