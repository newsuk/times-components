type ImageCrops = {
  url?: string;
  ratio?: string;
};
type ListData = {
  label: string;
  href: string;
};

type ImageProps = {
  alt?: string;
  caption?: string;
  credits?: string;
  crops?: ImageCrops[];
};
export type ArticleProps = {
  headline: string;
  flag?: string;
  standfirst?: string;
  tagL1?: {
    label: string;
    href: string;
  };
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
  showTagL1?: boolean;
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
