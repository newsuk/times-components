import { MQPartial } from 'newskit';
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

export interface CustomStackLayoutProps {
  marginBlockEnd?: string;
  className?: string;
}
export interface CustomGridLayoutProps {
  children?: React.ReactNode;
}
