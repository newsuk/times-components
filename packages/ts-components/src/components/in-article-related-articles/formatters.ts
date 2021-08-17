import get from 'lodash.get';

export const formatRelatedArticles = (relatedArticleSlice: any) =>
  relatedArticleSlice.items.map(({ article }: any) => ({
    label: article.label,
    headline: article.shortHeadline || article.headline,
    link: article.url,
    summary:
      get(article, 'summary225[0].children[0].attributes.value') ||
      get(article, 'summary225[0].children[0].children[0].attributes.value'),
    publishedTime: article.publishedTime,
    image:
      get(article, 'leadAsset.crop169.url') ||
      get(article, 'leadAsset.posterImage.crop169.url'),
    byline: get(article, 'bylines[0].byline[0].children[0].attributes.value')
  }));
