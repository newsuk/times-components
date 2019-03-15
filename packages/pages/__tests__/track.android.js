import { NativeModules } from "react-native";
import "./mock-track";
import trackArticle from "../src/article/track-article";
import trackSection from "../src/section/track-section";

export default () => {
  it("article page view tracking calls onArticleLoaded only", () => {
    const {
      ArticleEvents: { onArticleLoaded },
      ReactAnalytics: { track }
    } = NativeModules;

    trackArticle({
      action: "Viewed",
      attrs: { articleId: "dummy-article-id" },
      object: "Article"
    });

    expect(onArticleLoaded).toHaveBeenCalled();
    expect(track).not.toHaveBeenCalled();
  });

  it("section page view tracking calls only onSectionLoaded", () => {
    const {
      SectionEvents: { onSectionLoaded },
      ReactAnalytics: { track }
    } = NativeModules;

    trackSection({
      action: "Viewed",
      attrs: { sectionName: "dummy-section-name" },
      object: "Section"
    });

    expect(onSectionLoaded).toHaveBeenCalled();
    expect(track).not.toHaveBeenCalled();
  });
};
