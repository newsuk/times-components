import {
  Article,
  PublicationName,
  Url,
  Flag,
  SectionName,
  TemplateType
} from "./types";
import keywords from "./mock-keywords";
import UUID from "./mock-UUID";
import getPublicationName from "./mock-publication-name";
import MockImage from "./mock-image";
import getArticleSlice from "./mock-article-slice";
import MockMarkup from "./mock-markup";

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
      paywalledContent: new MockMarkup()
        .withXParagraphs(5)
        .withAd()
        .create(),
      url: "/article/123" as Url,
      slug: `british-trio-stopped-on-the-way-to-join-isis`,
      commentCount: 0,
      template: TemplateType.mainstandard,
      byline: new MockMarkup().withInline().create(),
      flags: [Flag.EXCLUSIVE],
      label: "label",
      content: new MockMarkup()
        .withXParagraphs(3)
        .withAd()
        .create(),
      headline: "test headline",
      publishedTime: new Date(0),
      section: SectionName.business,
      shortHeadline: "shortheadline",
      shortIdentifier: "37b27qd2s",
      standfirst: "standfirst",
      title: "title",
      summary: new MockMarkup().withParagraph().create()
    };
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
