import { ArticleProps } from '../components/slices/article';
import { ClickHandlerType, MouseEventType } from '../slices/types';

export const articleClickTracking = (
  event: MouseEventType,
  article: ArticleProps,
  clickHandler: ClickHandlerType
) => {
  if (article) {
    clickHandler(event, article);
  }
  // location.href is required instead of <a href={} />
  // this is a side effect caused by transformChannelData
  // changing article urls client-side causes hydration warning
  location.href = article.url;
};
