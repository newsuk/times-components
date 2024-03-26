import { ArticleBookmark } from '@times-components/ts-components';
import { PropsWithChildren, ReactNode } from 'react';

export type SaveAndShareBarProps = {
  articleId: string;
  articleUrl: string;
  articleHeadline: string;
  savingEnabled: boolean;
  sharingEnabled: boolean;
  isPreviewMode: boolean;
  onCopyLink?: () => void;
};

export type SaveButtonProps = {
  loading: boolean;
  error: boolean;
  data?: ArticleBookmark;
  articleId: string;
  onToggleSave: (id: string, isSaved: boolean) => void;
};

export type ShareItemProps = PropsWithChildren<{
  testId: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  tooltipContent: string;
}>;

export type ShareItemLabelProps = PropsWithChildren<{
  icon: ReactNode;
}>;

export type EmailShareProps = {
  articleUrl: string;
  articleHeadline: string;
  articleId: string;
  shouldTokenise: boolean;
  publicationName?: string;
};
