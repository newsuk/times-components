import { SliceData, SliceSlot, SliceArticle } from '../types/slice';

import { formatLabel } from './formatLabel';

const formatArticle = (title: string, article?: SliceArticle) =>
  article ? { ...article, label: formatLabel(title, article) } : undefined;

export const convertChannelSlice = (
  title: string,
  slice: SliceData
): SliceData => ({
  name: slice.name,
  children: slice.children.map((slot: SliceSlot) => ({
    article: formatArticle(title, slot.article)
  }))
});
