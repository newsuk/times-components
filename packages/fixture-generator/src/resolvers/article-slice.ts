import { ArticleSlice, Tile } from "../types";
import  MockArticle  from "../mock-article";


export default (count: number): ArticleSlice => {
    const articles = new Array(5).fill(0).map(() => {
        const article =  new MockArticle().withImageLeadAsset().fetch()
        return { article, headline: article.headline, leadAsset: article.leadAsset }
    })
    const items: Array<Tile> = articles;
    return ( { items } )
}
