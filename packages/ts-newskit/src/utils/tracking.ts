// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import { PuzzleScrollClickHandlerType } from '../components/puzzles/cards-container/types';
import { ClickHandlerType, MouseEventType } from '../slices/types';

type TrackingArticleProps = {
  id: string;
  headline: string;
  url: string;
};

type TrackingPuzzleCategoryProps = {
  nextPrev: string;
  puzzleType: string;
};

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

export const puzzleCategoryClickTracking = (
  event: MouseEventType,
  puzzleScroll: TrackingPuzzleCategoryProps,
  clickHandler: PuzzleScrollClickHandlerType
) => {
  puzzleScroll && clickHandler(event, puzzleScroll);
};
