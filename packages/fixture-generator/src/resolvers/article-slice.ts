import { ArticleSlice, Tile } from "../types";
import  MockArticle  from "../mock-article";


export default (): ArticleSlice => {
   
   
    
    const items: Array<Tile> = [{article: new MockArticle().fetch(), headline: "lol"
    }];
    return ( { items } )
}
