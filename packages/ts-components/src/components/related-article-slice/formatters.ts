import { SliceArticle } from '@times-components/ts-slices';
import { Asset, RelatedArticle, RelatedArticles } from './types';

const decodeEntities = (str: string) =>
  str
    .replace(/&#(\d+);/g, (__: string, d: number) => String.fromCharCode(d))
    .replace(/\s+/g, ' ');

const isLabelEqualTo = (label: string, match?: string) =>
  label && match && label.toLowerCase() === match.toLowerCase();

const isLabelAttrValid = (title: string, label: string, byline?: string) =>
  !isLabelEqualTo(label, title) && !isLabelEqualTo(label, byline);

const getLabelAttributes = (label?: string) =>
  label ? label.split(' | ') : [];

const formatLabel = (title: string, article: Partial<SliceArticle>) =>
  getLabelAttributes(article.label)
    .map((a: string) => decodeEntities(a))
    .filter((a: string) => isLabelAttrValid(title, a, article.byline))
    .join(' | ');

const flattenAssets = (asset: Asset) => {
  const crops = [];
  if (asset.crop169) {
    crops.push({
      url: asset.crop169.url,
      ratio: '16:9'
    });
  }
  if (asset.crop32) {
    crops.push({
      url: asset.crop32.url,
      ratio: '3:2'
    });
  }
  return crops;
};
const formatArticle = (
  article: RelatedArticle,
  numberOfArticles: number
): SliceArticle => {
  const leadAssetCrops =
    (article.leadAsset &&
      article.leadAsset.posterImage &&
      flattenAssets(article.leadAsset.posterImage)) ||
    [];

  const leadAsset = {
    title: article.leadAsset && article.leadAsset.title,
    crops: leadAssetCrops
  };
  const summary =
    (numberOfArticles === 1 &&
      article.summary225[0].children[0].attributes &&
      article.summary225[0].children[0].attributes.value) ||
    undefined;

  const byline = article.bylines[0].byline[0].children[0].attributes.value;

  const crops = (article.leadAsset && flattenAssets(article.leadAsset)) || [];

  return {
    id: article.id,
    url: article.url,
    label: formatLabel(leadAsset.title!, { label: article.label!, byline }),
    byline,
    headline: article.headline,
    summary,
    datePublished: article.publishedTime,
    dateUpdated: article.updatedTime,
    images: {
      alt: '',
      crops: [...leadAssetCrops, ...crops]
    }
  };
};

const getSliceName = (relatedArticleSlice: RelatedArticles) => {
  if (relatedArticleSlice.items.length === 1) {
    return 'RELATED_ARTICLE_1';
  }
  if (relatedArticleSlice.items.length === 2) {
    return 'LEAD_2';
  }
  return 'LEAD_1_AND_2';
};
const formatSlice = (relatedArticleSlice: RelatedArticles) => {
  return {
    name: getSliceName(relatedArticleSlice),
    children: relatedArticleSlice.items.map(relatedArticle => ({
      article: formatArticle(
        relatedArticle.article,
        relatedArticleSlice.items.length
      )
    }))
  };
};
export default formatSlice;
