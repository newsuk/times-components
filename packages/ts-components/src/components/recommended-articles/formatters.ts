import { SliceArticle } from '@times-components/ts-slices';

// TYPES

type Byline =
  | { type: 'author'; name: string }
  | { type: 'inline'; value: string };

type MediaCrop = {
  url: string;
  alt?: string;
  aspectRatio: string;
};
type Media = {
  crops: MediaCrop[];
  posterImage: { crops: MediaCrop[] };
};

type SummaryText = { text: string };
type Summary = { children: SummaryText[] };

type Article = {
  url: string;
  slug: string;
  label?: string;
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

const getImageCrops = (crops: MediaCrop[]) =>
  crops.map(crop => ({ url: crop.url, ratio: crop.aspectRatio }));

const getImage = (media?: Media) => {
  if (media) {
    if (media.crops) {
      return getImageCrops(media.crops);
    }
    if (media.posterImage && media.posterImage.crops) {
      return getImageCrops(media.posterImage.crops);
    }
  }
  return [];
};

// MAIN

const formatArticle = (article: Article): SliceArticle => {
  return {
    url: article.url,
    label: article.label,
    byline: getBylines(article.bylines),
    headline: article.headline,
    summary: getSummary(article.summary),
    datePublished: article.publishedDateTime,
    images: {
      alt: article.headline,
      crops: getImage(article.media)
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

export const getRecommendedArticlesSlice = (articles: Article[]) => {
  return {
    name: getSliceName(articles.length),
    children: articles
      .map((article: Article) => ({
        article: formatArticle(article)
      }))
      .slice(0, 3)
  };
};
