import { RelatedArticleType } from '../../types/related-article-slice';
type TodaysSectionItem = {
  id: string;
  headline: string;
  slug: string;
  url?: string;
  shortIdentifier?: string;
  leadAsset: Array<{
    ratio: string;
    source: string;
  }>;
  media?: {}
};

export type TodaysSection = {
  section: string;
  items: TodaysSectionItem[];
};

export const getSectionTitle = (section: TodaysSection) => {
  return section && section.section;
};

export const formatTodaysSection = (
  section: TodaysSection
): RelatedArticleType[] | undefined => {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',section)
  return (
    section &&
    section.items.map<RelatedArticleType>((article: TodaysSectionItem) => ({
      id: article.id,
      slug: article.slug,
      label: null,
      shortIdentifier: article.shortIdentifier,
      headline: article.headline,
      section: section.section,
      url: article.url ? article.url :`/article/${article.slug}-${article.shortIdentifier}`,
      leadAsset: {
        crop169: {
          url:
            article.leadAsset &&
            article.leadAsset.find((crop: any) => crop.ratio === '16:9')!.source
        },
        crop32: {
          url:
            article.leadAsset &&
            article.leadAsset.find((crop: any) => crop.ratio === '3:2')!.source
        }
      },
      bylines: []
    }))
  );
};
