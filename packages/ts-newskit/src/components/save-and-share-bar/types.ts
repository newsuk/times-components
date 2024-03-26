import { ArticleBookmark } from '@times-components/ts-components';
import { PropsWithChildren, ReactNode } from 'react';

export type SaveButtonProps = {
  loading: boolean;
  error: boolean;
  data?: ArticleBookmark;
  articleId: string;
  onToggleSave:(id: string, isSaved: boolean) => void;
}

export type ShareItemProps = PropsWithChildren<{
  testId: string,
  href: string,
  onClick: (e: React.MouseEvent<HTMLElement>) => void,
  tooltipContent: string
}>

export type ShareItemLabelProps = PropsWithChildren<{
  icon: ReactNode
}>

export type EmailShareProps = {
  getTokenisedShareUrl: (id: string) => Promise<any>,
  onShareEmail: (props: { articleId: string, articleUrl: string, articleHeadline: string }) => void,
  articleUrl: string,
  articleHeadline: string,
  articleId: string,
  shouldTokenise: boolean,
  publicationName?: string
}