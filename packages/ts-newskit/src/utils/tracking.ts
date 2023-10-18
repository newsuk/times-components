import { ClickHandlerType, MouseEventType } from '../slices/types';

type TrackingArticleProps = {
  id: string;
  headline: string;
  url: string;
}

export const articleClickTracking = (
  event: MouseEventType,
  article: TrackingArticleProps,
  clickHandler: ClickHandlerType
) => {
  article && clickHandler(event, article);

  // location.href is required instead of <a href={} />
  // this is a side effect caused by transformChannelData
  // changing article urls client-side causes hydration warning
  location.href = article.url;
};
