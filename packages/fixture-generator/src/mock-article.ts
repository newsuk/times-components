import { Article, PublicationName, Url, Slug } from "./types";
import keywords from "./resolvers/keywords";
import UUID from "./resolvers/UUID";
import getPublicationName from "./resolvers/publication-name"; 
import MockImage from "./resolvers/image";

const articleContent =  [
  {
    "name": "paragraph",
    "attributes": {},
    "children": [
      {
        "name": "text",
        "attributes": {
          "value": "As I follow Chris Reynolds Gordon down the first floor corridor of a £27 million house, nestled between the Colombian consulate and the Swedish ambassador’s residence, we pass an ornate room full of mattresses. He smiles and closes the door as we walk past. This is the habitat of a man who is making his fortune from hosting “elite” sex parties in one of London’s wealthiest postcodes, and the room was the venue of his latest sex party. He has not read Fifty Shades of Grey but, he says, “I’m living it.”"
        },
        "children": []
      }
    ]
  },
  {
    "name": "paragraph",
    "attributes": {},
    "children": [
      {
        "name": "text",
        "attributes": {
          "value": "The “elite” have been chosen from those who, through his Heaven SX website and social media, apply for invitations to his parties. Most applicants, he claims, are discarded because of paunch and age, and only the best-looking get to pay around £100 for a ticket. They drink, chat and then, at midnight, the women get changed into lingerie. “It’s loads of girls, all giggling, putting on their stockings, hair flowing,” he explains. “Then they walk in, the guys go, ‘Wow,’ and the mood changes. They all start disappearing and, before you know it, there are 30 girls on a bed and designer gear everywhere. When I pull it off I can’t believe I created it.”"
        },
        "children": []
      }
    ]
  },
]
class MockArticle {
  article: Article;

  constructor() {
    this.article = {
      id: UUID(),
      keywords: keywords(),
      publicationName: getPublicationName(),
      paywalledContent:  articleContent,
      url: "/article/123" as Url,
      slug: `british-trio-stopped-on-the-way-to-join-isis`,
      byline: "markup",
      content: articleContent,
      publishedTime: new Date(0)
    }; 
  }

  withImage() {
    this.article.leadAsset = new MockImage().fetch()
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
