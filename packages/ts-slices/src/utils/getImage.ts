import get from 'lodash.get';

import { SliceArticle } from '../types/slice';

export const getImageByRatio = (ratio: string, article: SliceArticle) =>
  article.images.crops.find(c => c.ratio === '*' || c.ratio === ratio);

export const getImageAltText = (article?: SliceArticle) =>
  get(article, 'images.alt', get(article, 'headline'));
