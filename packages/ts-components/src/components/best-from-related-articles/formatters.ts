// @ts-ignore
export const formatNewskitData = (slice) => {
  return (
      slice.items.map((article) => ({
      id: article.id,
      publishedTime: article.publishedDateTime,
      url: article.url,
      headline: article.headline,
      leadAsset: {
        crop169: {
          url:
            article.media &&
            article.media.crop.url
        },
        crop32: {
          url:
            article.media &&
            article.media.crop.url,
        }
      },
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
                    value: article.bylines[0].value || article.bylines[0].name
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
      ],
      summary125: [
        {
          name: 'paragraph',
          children: [
            {
              name: 'text',
              attributes: {
                value: article.summary.children[0].text
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
                value: article.summary.children[0].text
              },
              children: []
            }
          ]
        }
      ],
    }))
  )
}