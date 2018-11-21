import {
  Article,
  PublicationName,
  Url,
  Slug,
  Flag,
  SectionName,
  TemplateType
} from "./types";
import keywords from "./resolvers/keywords";
import UUID from "./resolvers/UUID";
import getPublicationName from "./resolvers/publication-name";
import MockImage from "./resolvers/image";
import { MockList } from "apollo-server";
import getArticleSlice from "./resolvers/article-slice";
import MockMarkup from "./resolvers/mock-markup";

class MockArticle {
  article: Article;

  constructor() {
    this.article = {
      leadAsset: new MockImage().create(),
      hasVideo: false,
      commentsEnabled: false,
      isBookmarked: false,
      commercialTags: ["commercial tag"],
      id: UUID(),
      keywords: keywords(),
      publicationName: getPublicationName(),
      paywalledContent: new MockMarkup().withXParagraphs(5).withAd().create(),
      url: "/article/123" as Url,
      slug: `british-trio-stopped-on-the-way-to-join-isis`,
      commentCount: 0,
      template: TemplateType.mainstandard,
      byline: new MockMarkup().withInline().create(),
      flags: [Flag.EXCLUSIVE],
      label: "label",
      content:  new MockMarkup().withXParagraphs(3).withAd().create(),
      headline: "test headline",
      publishedTime: new Date(0),
      section: SectionName.business,
      shortHeadline: "shortheadline",
      shortIdentifier: "37b27qd2s",
      standfirst: "standfirst",
      title: "title",
      summary: new MockMarkup().withParagraph().create()
      // topics: [
      //   {
      //     name: "Islington",
      //     slug: "islington"
      //   },
      //   {
      //     name: "Chelsea",
      //     slug: "chelsea"
      //   }
      // ]
    };
  }

  withImageLeadAsset() {
    this.article.leadAsset = new MockImage().create();
    return this;
  }

  withRelatedArticles(count = 3) {
    this.article.relatedArticleSlice = getArticleSlice(count);
    return this;
  }

  withSundayTimes() {
    this.article.publicationName = getPublicationName(
      PublicationName.SUNDAYTIMES
    );
    return this;
  }

  create() {
    return this.article;
  }
}

export default MockArticle;
