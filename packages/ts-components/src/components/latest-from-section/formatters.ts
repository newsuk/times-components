import { RelatedArticleType } from '../../types/related-article-slice';
type LatestSectionItem = {
  id: string;
  headline: string;
  canonicalID: string;
  summary: string;
  publishedTime: string;
  updatedTime: string;
  author: string;
  slug: string;
  label?: string;
  shortIdentifier: string;
  leadAsset: Array<{
    ratio: string;
    source: string;
  }>;
};

export type LatestSection = {
  section: string;
  items: LatestSectionItem[];
};

export const getSectionTitle = (section: LatestSection) => {
  return section && section.section;
};

export const formatLatestFromSection = (
  section: LatestSection
): RelatedArticleType[] | undefined => {
  return (
    section &&
    section.items.map<RelatedArticleType>((article: LatestSectionItem) => ({
      id: article.id,
      shortIdentifier: article.shortIdentifier,
      slug: article.slug,
      label: article.label || null,
      headline: article.headline,
      section: section.section,
      url: `/article/${article.slug}-${article.shortIdentifier}`,
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
      summary125: [
        {
          name: 'paragraph',
          children: [
            {
              name: 'text',
              attributes: {
                value: article.summary
              },
              children: []
            }
          ]
        }
      ],
      summary145: [
        {
          name: 'paragraph',
          children: [
            {
              name: 'text',
              attributes: {
                value: article.summary
              },
              children: []
            }
          ]
        }
      ],
      publishedTime: article.publishedTime,
      updatedTime: article.updatedTime,
      bylines: [
        {
          byline: [
            {
              name: 'author',
              children: [
                {
                  name: 'text',
                  children: [],
                  attributes: {
                    value: article.author
                  }
                }
              ],
              attributes: {
                slug: 'didi-tang'
              }
            }
          ],
          image: null
        }
      ]
    }))
  );
};
