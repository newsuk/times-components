import { PuzzleScrollClickHandlerType, MouseEventType } from '../cards-container/types';

type TrackingPuzzleCategoryProps = {
  nextPrev: string;
  puzzleType: string;
};

export const puzzleCategoryClickTracking = (
  event: MouseEventType,
  puzzleScroll: TrackingPuzzleCategoryProps,
  clickHandler: PuzzleScrollClickHandlerType
) => {
  puzzleScroll && clickHandler(event, puzzleScroll);
};
