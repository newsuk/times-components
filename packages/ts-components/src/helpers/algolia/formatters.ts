import { stripTags } from '@times-components/utils';
import get from 'lodash.get';
import { AlgoliaArticle, IndexedArticle } from './algoliaRelatedArticles';

const formatSummaryContent = (article: IndexedArticle, length: number) => {
  const summary = stripTags(article.content, ' ').trim();
  return summary.substring(0, summary.lastIndexOf(' ', length));
};

const formatSummary = (article: IndexedArticle, length: number) => [
  {
    children: [
      {
        attributes: { value: formatSummaryContent(article, length) },
        children: [],
        name: 'text'
      }
    ],
    name: 'paragraph'
  }
];

const formatImage = (article: AlgoliaArticle, ratio: string) =>
  get(article, 'leadAsset.crop.ratio') === ratio
    ? { url: get(article, 'leadAsset.crop.url') }
    : undefined;

export const formatArticle = (article: any) => ({
  article: {
    id: article.id,
    url: article.url,
    leadAsset: {
      id: get(article, 'leadAsset.id'),
      title: get(article, 'leadAsset.title'),
      crop169: formatImage(article, '16:9')
    },
    label: article.label,
    section: article.section,
    hasVideo: article.hasVideo,
    headline: article.headline,
    shortHeadline: article.shortHeadline,
    bylines: [{ byline: article.byline }],
    publishedTime: article.publishedTime,
    summary125: formatSummary(article, 125),
    summary145: formatSummary(article, 145)
  }
});

type Bylines = Array<{ byline: Array<{ children: any[] }> }>;

export const formatByLines = (bylines: Bylines) =>
  bylines &&
  bylines.length === 1 &&
  bylines[0].byline
    .map(({ children }) =>
      children.map(({ attributes }) => attributes.value).join(' ')
    )
    .join(' ');
