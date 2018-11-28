import { ArticleSlice, Tile } from "./types";
import MockArticle from "./mock-article";

function mockArticleSlice(count: number): ArticleSlice {
  const articles = new Array(count).fill(0).map(() => {
    const article = new MockArticle().get();
    return {
      article,
      headline: article.headline,
      leadAsset: article.leadAsset
    };
  });
  const items: Array<Tile> = articles;
  return { items };
}

export default mockArticleSlice;
