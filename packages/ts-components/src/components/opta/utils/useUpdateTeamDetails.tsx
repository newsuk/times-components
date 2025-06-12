import { RefObject, useEffect } from 'react';
import { isNationalCompetition, replaceTeamName } from './replaceTeamDetails';
import { OptaSport } from '../shared/fixtures-ticker/OptaFixturesTicker';

export const useUpdateTeamDetails = (
  sport: OptaSport,
  competition: string,
  ref: RefObject<HTMLDivElement>,
  container: string
) => {
  useEffect(
    () => {
      const isNationalComp = isNationalCompetition(competition, sport);
      const isLionsComp = sport === 'rugby' && competition === '221';

      isNationalComp && ref.current && ref.current.classList.add('team-flags');

      if (isLionsComp || isNationalComp) {
        const TeamNameContainers = document.getElementsByClassName(container);
        TeamNameContainers && replaceTeamName(TeamNameContainers);
      }
    },
    [ref, competition]
  );
};
