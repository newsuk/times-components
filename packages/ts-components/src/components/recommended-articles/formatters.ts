import { SliceArticle } from '@times-components/ts-slices';

// TYPES

type Byline =
  | { __typename: string; type: 'author'; name: string }
  | { __typename: string; type: 'inline'; value: string };

type MediaCrop = {
  __typename: string;
  url: string;
  alt?: string;
  aspectRatio: string;
};
type Media = {
  __typename: string;
  crops: MediaCrop[];
  posterImage: { crops: MediaCrop[] };
};

type SummaryText = { __typename: string; text: string };
type Summary = { __typename: string; children: SummaryText[] };

type Article = {
  __typename: string;
  url: string;
  slug: string;
  label: string;
  headline: string;
  publishedDateTime: string;
  bylines?: Byline[];
  summary?: Summary;
  media?: Media;
};

// HELPERS

const getBylines = (bylines?: Byline[]) =>
  bylines
    ? bylines
        .map(byline => (byline.type === 'author' ? byline.name : byline.value))
        .join('')
    : undefined;

const getSummary = (summary?: Summary) =>
  summary && summary.children
    ? summary.children.map(child => child.text).join('') + '...'
    : undefined;

const getImageCrops = (crops: MediaCrop[], domainSpecificUrl: string) =>
  crops.map(crop => {
    const cropPath = new URL(crop.url).pathname
    return ({ url: domainSpecificUrl + cropPath, ratio: crop.aspectRatio })
  });

const getImage = (domainSpecificUrl: string, media?: Media) => {
  if (media) {
    if (media.crops) {
      return getImageCrops(media.crops, domainSpecificUrl);
    }
    if (media.posterImage && media.posterImage.crops) {
      return getImageCrops(media.posterImage.crops, domainSpecificUrl);
    }
  }
  return [];
};

// MAIN

const formatArticle = (article: Article, domainSpecificUrl: string): SliceArticle => {
  return {
    url: new URL(article.url).pathname,
    label: article.label,
    byline: getBylines(article.bylines),
    headline: article.headline,
    summary: getSummary(article.summary),
    datePublished: article.publishedDateTime,
    images: {
      alt: article.headline,
      crops: getImage(domainSpecificUrl, article.media)
    }
  };
};

const getSliceName = (numOfArticles: number) => {
  switch (numOfArticles) {
    case 1:
      return 'RELATED_ARTICLE_1';
    case 2:
      return 'RELATED_ARTICLE_2';
    default:
      return 'RELATED_ARTICLE_3';
  }
};

export const getRecommendedArticlesSlice = (articles: Article[], domainSpecificUrl: string) => {
  return {
    name: getSliceName(articles.length),
    children: articles
      .map((article: Article) => ({
        article: formatArticle(article, domainSpecificUrl)
      }))
      .slice(0, 3)
  };
};
