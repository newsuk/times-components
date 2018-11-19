import { Article, PublicationName, Markup, Url, Media } from "./types";
import keywords from "./resolvers/keywords";
import UUID from "./resolvers/UUID";
import getPublicationName from "./resolvers/publication-name"; 
import MockImage from "./resolvers/image";

class MockArticle {
  article: Article;

  constructor() {
    this.article = {
      id: UUID(),
      keywords: keywords(),
      publicationName: getPublicationName(),
      paywalledContent: [],
      url: "/article/123" as Url
    }; 
  }

  withImage() {
    this.article.leadAsset = new MockImage().fetch() as Media
    return this;
  }

  withSundayTimes() {
    this.article.publicationName = getPublicationName(
      PublicationName.SUNDAYTIMES
    );
    return this;
  }

  fetch() {
    return this.article;
  }
}

export default MockArticle;
