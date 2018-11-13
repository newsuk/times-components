import { Article, PublicationName } from './types';
import keywords from './resolvers/keywords';
import UUID from './resolvers/UUID';
import getPublicationName from './resolvers/publication-name';

class MockArticle {
    article: Article;

    constructor() {
        this.article = {
            id: UUID(),
            keywords: keywords(),
            publicationName: getPublicationName()
        }
    }

    withSundayTimes() {
        this.article.publicationName = getPublicationName(PublicationName.SUNDAYTIMES);
        return this;
    }

    fetch() {
        return this.article;
    }
}

export default MockArticle;