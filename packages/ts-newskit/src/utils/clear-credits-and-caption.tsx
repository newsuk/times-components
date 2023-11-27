import { LeadArticleProps } from '../components/slices/lead-article';
import { ImageProps } from '../slices/types';

export const clearCreditsAndCaption = (data: LeadArticleProps) => {
  const updatedImages: ImageProps = {
    ...data.images,
    credits: '',
    caption: ''
  };

  return {
    ...data,
    images: updatedImages
  };
};
