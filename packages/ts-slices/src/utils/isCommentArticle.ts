import { SliceArticle } from '../types/slice';

export const isCommentArticle = (article?: SliceArticle) =>
  article &&
  (article.template === 'maincomment' ||
    article.template === 'magazinecomment' ||
    article.template === 'externalcomment');
