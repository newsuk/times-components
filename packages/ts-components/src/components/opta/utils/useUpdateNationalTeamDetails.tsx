import { RefObject, useEffect } from 'react';
import { replaceWithTBD } from './replaceNationalTeamDetails';

export const useUpdateNationalTeamDetails = (
  ref: RefObject<HTMLDivElement>,
  container: string
) => {
  useEffect(
    () => {
      ref.current && ref.current.classList.add('team-flags');

      const TeamNameContainers = document.getElementsByClassName(container);
      TeamNameContainers && replaceWithTBD(TeamNameContainers);
    },
    [ref]
  );
};
