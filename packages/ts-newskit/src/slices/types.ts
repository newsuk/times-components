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
