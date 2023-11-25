import {
  LeadArticleProps,
  ImageProps
} from '../components/slices/lead-article';

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
