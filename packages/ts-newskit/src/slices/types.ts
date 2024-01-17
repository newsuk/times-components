import { MQPartial, MQ } from 'newskit';
import { ArticleProps } from '../components/slices/article';

export type SliceArticle = {
  id?: string;
  headline: string;
};

export type MouseEventType = React.MouseEvent<HTMLAnchorElement, MouseEvent>;

export type ClickHandlerType = (
  event: MouseEventType,
  article: SliceArticle,
  position?: string
) => void;

export type StackArticleOptions = MQPartial<Partial<ArticleProps>>;

export type CustomStackLayoutProps = {
  marginBlockEnd?: string;
  className?: string;
};
export type CustomGridLayoutProps = {
  children?: React.ReactNode;
};
export type ImageCrops = {
  url?: string;
  ratio?: string;
};
export type ListData = {
  label: string;
  href: string;
  id: string;
};

export type ImageProps = {
  alt?: string;
  caption?: string;
  credits?: string;
  crops?: ImageCrops[];
};

export type expirableFlagsProps = {
  type: string;
  expiryTime: string | null;
};

export type LiveTagProps = {
  liveTag?: string;
};

export type TagAndFlagProps = {
  flag?: string;
  flagOverrides?: {
    typographyPreset?: MQ<string> | string;
    stylePreset?: MQ<string> | string;
  };
  byline?: {
    name: string;
    slug?: string;
  };
  isListView?: boolean;
  tag?: {
    label: string;
    href: string;
  };
  marginBlockStart?: MQ<string> | string;
};
