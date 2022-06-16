export const getArticles = (data: any, numOfArticles: number) => ({
  recommendations: {
    articles: data.recommendations.articles.slice(0, numOfArticles)
  }
});
