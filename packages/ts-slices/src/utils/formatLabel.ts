import { SliceArticle } from '../types/slice';
import { decodeEntities } from './decodeEntities';

const isLabelEqualTo = (label: string, match?: string) =>
  label && match && label.toLowerCase() === match.toLowerCase();

const isLabelAttrValid = (title: string, label: string, byline?: string) =>
  !isLabelEqualTo(label, title) && !isLabelEqualTo(label, byline);

const getLabelAttributes = (label?: string) =>
  label ? label.split(' | ') : [];

export const formatLabel = (title: string, article: Partial<SliceArticle>) =>
  getLabelAttributes(article.label)
    .map((a: string) => decodeEntities(a))
    .filter((a: string) => isLabelAttrValid(title, a, article.byline))
    .join(' | ');
