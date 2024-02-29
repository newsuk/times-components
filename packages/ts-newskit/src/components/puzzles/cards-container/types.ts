export type PuzzleScroll = {
    puzzleType?: string;
    nextPrev: string;
};
  
export type MouseEventType = React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  
export type PuzzleScrollClickHandlerType = (
    event: MouseEventType,
    puzzle: PuzzleScroll,
) => void;
  