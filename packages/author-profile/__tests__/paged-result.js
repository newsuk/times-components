import articleListWithImagesFixture from "@times-components/provider/fixtures/author-profile/article-list-with-images.json";

export default (skip, first) => ({
  data: {
    author: {
      ...articleListWithImagesFixture.data.author,
      articles: {
        ...articleListWithImagesFixture.data.author.articles,
        list: articleListWithImagesFixture.data.author.articles.list
          .map(el => ({
            ...el,
            publishedTime: new Date(el.publishedTime)
          }))
          .slice(skip, skip + first)
      }
    }
  }
});
