import { RelatedArticleSliceType } from '../../types/related-article-slice';

// TYPES

export type Byline =
  | { __typename: string; type: 'author'; name: string }
  | { __typename: string; type: 'inline'; value: string };

type MediaCrop = {
  __typename: string;
  url: string;
  alt?: string;
  aspectRatio: string;
};
type Media = { __typename: string; crops: MediaCrop[] };

export type SummaryText = { __typename: string; text: string };
type Summary = { __typename: string; children: SummaryText[] };

export type Article = {
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

const getBylineAttr = (byline: Byline) => ({
  value: byline.type === 'author' ? byline.name : byline.value
});

const getByline = (byline: Byline) => ({
  name: byline.type,
  children: [{ name: 'text', attributes: getBylineAttr(byline), children: [] }]
});

const getBylines = (bylines?: Byline[]) => {
  if (bylines) {
    return bylines.map((byline: Byline) => ({ byline: [getByline(byline)] }));
  }
  return undefined;
};

const getSummaryText = (summary: Summary) => {
  const text = summary.children
    .map((child: SummaryText) => child.text)
    .join('');
  return { value: text.slice(0, text.slice(0, 125).lastIndexOf(' ')) };
};

const getSummaryParagraph = (summary: Summary) => [
  { name: 'text', attributes: getSummaryText(summary), children: [] }
];

const getSummary = (summary?: Summary) => {
  if (summary && summary.children) {
    return [{ name: 'paragraph', children: getSummaryParagraph(summary) }];
  }
  return [];
};

const getImage = (media?: Media) => {
  if (media && media.crops) {
    const image = media.crops.find(
      (crop: MediaCrop) => crop.aspectRatio === '16:9'
    );
    return image ? { crop169: { url: image.url }, title: image.alt } : null;
  }
  return {};
};

// MAIN

export const getRelatedArticlesSlice = (
  articles: any
): RelatedArticleSliceType => ({
  sliceName: 'StandardSlice',
  items: articles
    .map((article: Article) => ({
      article: {
        slug: article.slug,
        shortIdentifier: article.url.slice(-9),
        label: article.label,
        headline: article.headline,
        publishedTime: article.publishedDateTime,
        bylines: getBylines(article.bylines),
        summary125: getSummary(article.summary),
        leadAsset: getImage(article.media)
      }
    }))
    .slice(0, 3)
});
