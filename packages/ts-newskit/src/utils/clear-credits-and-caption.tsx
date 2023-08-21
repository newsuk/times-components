import { expirableFlagsProps } from '../components/slices/shared/articleTileInfo';

type ImageCrops = {
  url?: string;
  ratio?: string;
};
type ListData = {
  label: string;
  href: string;
  id: string;
};

type ImageProps = {
  alt?: string;
  caption?: string;
  credits?: string;
  crops?: ImageCrops[];
};
export type ArticleProps = {
  id: string;
  headline: string;
  flag?: string;
  standfirst?: string;
  contentType?: string;
  label?: string;
  expirableFlags?: expirableFlagsProps[];
  images?: ImageProps;
  url: string;
  tag?: {
    label: string;
    href: string;
  };
  imageTop?: boolean;
  hasTopBorder?: boolean;
  contentTop?: boolean;
  contentWidth?: string;
  headlineTypographyPreset?: string;
  loadingAspectRatio?: string;
  imageMarginBlockStart?: string;
  textBlockMarginBlockStart?: string;
  tagAndFlagMarginBlockStart?: string;
  listData?: ListData[];
  hideImage?: boolean;
};

export const clearCreditsAndCaption = (data: ArticleProps): ArticleProps => {
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
