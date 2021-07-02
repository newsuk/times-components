export const formatLatesetFromSection = (
  latestFromSection: any[],
  sectionName: string
) => {
  const section = latestFromSection.find((s: any) => s.section === sectionName);
  return (
    section &&
    section.items.map((article: any) => ({
      article: {
        id: article.id,
        shortIdentifier: article.shortIdentifier,
        slug: article.slug,
        label: article.label,
        headline: article.headline,
        leadAsset: {
          crop169: {
            url:
              article.leadAsset &&
              article.leadAsset.find((crop: any) => crop.ratio === '16:9')!
                .source
          },
          crop32: {
            url:
              article.leadAsset &&
              article.leadAsset.find((crop: any) => crop.ratio === '3:2')!
                .source
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
      }
    }))
  );
};
