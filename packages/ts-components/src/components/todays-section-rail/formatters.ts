import { RelatedArticleType } from '../../types/related-article-slice';
type TodaysSectionItem = {
  id: string;
  headline: string;
  slug: string;
  url: string;
  media?: {
    crop169: { url: string; alt: string };
    crop32: { url: string; alt: string };
  };
  bylines?: [];
};

export type TodaysSection = {
  articles: TodaysSectionItem[];
};


export const formatTodaysSection = (
  section: TodaysSection
): RelatedArticleType[] | undefined => {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX', section);
  return (
    section &&
    section.articles.map<RelatedArticleType>((article: TodaysSectionItem) => ({
      id: article.id,
      slug: article.slug,
      label: null,
      headline: article.headline,
      section: '',
      url: article.url && article.url,
      bylines: [],
      leadAsset: article.media && {
        crop169: {
          alt: article.media && article.media.crop169.alt,
          url: article.media && article.media.crop169.url
        },
        crop32: {
          alt: article.media && article.media.crop32.alt,
          url: article.media && article.media.crop32.url
        }
      }
    }))
  );
};
