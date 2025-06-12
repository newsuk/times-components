import { RefObject, useEffect } from 'react';
import { replaceTeamName } from './replaceTeamDetails';

export const useUpdateTeamNames = (
  ref: RefObject<HTMLDivElement>,
  container: string
) => {
  useEffect(
    () => {
      const TeamNameContainers = document.getElementsByClassName(container);
      TeamNameContainers && replaceTeamName(TeamNameContainers);
    },
    [ref]
  );
};
