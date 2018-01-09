import articleListWithImagesFixture from "../fixtures/article-list-with-images.json";

export default (skip, first) => ({
  data: {
    author: {
      ...articleListWithImagesFixture.data.author,
      articles: {
        ...articleListWithImagesFixture.data.author.articles,
        list: articleListWithImagesFixture.data.author.articles.list.slice(
          skip,
          skip + first
        )
      }
    }
  }
});
