import { clearCreditsAndCaption } from '../clear-credits-and-caption';

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
type ArticleProps = {
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

describe('clearCreditsAndCaptionObject', () => {
  it('should clear credits and caption of a single ArticleProps object', () => {
    const leadArticle: ArticleProps = {
      headline: 'Example Headline',
      url: '',
      images: {
        alt: 'Example Alt Text',
        credits: 'Example Credits',
        caption: 'Example Caption',
        crops: []
      }
    };

    const updatedLeadArticle = clearCreditsAndCaption(leadArticle);
    if (updatedLeadArticle && updatedLeadArticle.images) {
      expect(updatedLeadArticle.images.credits).toBe('');
      expect(updatedLeadArticle.images.caption).toBe('');
    }
  });
});
