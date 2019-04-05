import {
  Article,
  PublicationName,
  Url,
  Flag,
  Markup,
  SectionName,
  TemplateType
} from "./types";
import keywords from "./mock-keywords";
import UUID from "./mock-UUID";
import getPublicationName from "./mock-publication-name";
import MockImage from "./mock-image";
import getArticleSlice from "./mock-slice";
import MockMarkup from "./mock-markup";

interface TimesArticle extends Article {
  summary105: Markup | null;
  summary125: Markup | null;
  summary145: Markup | null;
  summary160: Markup | null;
  summary175: Markup | null;
  summary225: Markup | null;
  summary300: Markup | null;
}

class MockArticle {
  article: TimesArticle;

  constructor() {
    this.article = {
      leadAsset: new MockImage().get(),
      listingAsset: new MockImage().get(),
      hasVideo: false,
      commentsEnabled: false,
      isBookmarked: false,
      commercialTags: ["commercial tag"],
      id: UUID(),
      keywords: keywords(),
      publicationName: getPublicationName(),
      paywalledContent: new MockMarkup()
        .addParagraphs(5)
        .addAds()
        .get(),
      url: "/article/123" as Url,
      slug: `british-trio-stopped-on-the-way-to-join-isis`,
      commentCount: 0,
      template: TemplateType.Mainstandard,
      bylines: new MockMarkup().addBylines().get(),
      expirableFlags: [
        {
          type: Flag.Exclusive,
          expiryTime: "2030-03-14T12:00:00.000Z"
        }
      ],
      label: "label",
      content: new MockMarkup()
        .addParagraphs(3)
        .addAds()
        .get(),
      headline: "Venezuela shows how Corbyn’s socialism works",
      publishedTime: new Date(0),
      section: SectionName.Business,
      shortHeadline: "Driving Off",
      shortIdentifier: "37b27qd2s",
      standfirst:
        "Labour’s admiration for a regime that has squandered its resources and left its people in penury should be a warning to all",
      title: "title",
      summary: new MockMarkup().addParagraphs().get(),
      summary105: new MockMarkup().addSummary("summary105").get(),
      summary125: new MockMarkup().addSummary("summary125").get(),
      summary145: new MockMarkup().addSummary("summary145").get(),
      summary160: new MockMarkup().addSummary("summary160").get(),
      summary175: new MockMarkup().addSummary("summary175").get(),
      summary225: new MockMarkup().addSummary("summary225").get(),
      summary300: new MockMarkup().addSummary("summary300").get()
    };
  }

  setCommentsEnabled(enabled: boolean) {
    this.article.commentsEnabled = enabled;
    return this;
  }

  setRelatedArticles(count: number) {
    this.article.relatedArticleSlice = getArticleSlice(count);
    return this;
  }

  setTemplate(template: TemplateType) {
    this.article.template = template;
    return this;
  }

  sundayTimes() {
    this.article.publicationName = getPublicationName(
      PublicationName.Sundaytimes
    );
    return this;
  }

  get() {
    return this.article;
  }
}

export default MockArticle;
