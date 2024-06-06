import React, { useState, useEffect } from 'react';

import { Placeholder } from '@times-components/image';

import {
  initSettings,
  initStyleSheet,
  initScript,
  initElement,
  initComponent
} from '../../utils/config';

import { Container, PlaceholderContainer } from '../shared-styles';
import { WidgetContainer } from './styles';
import { isNationalCompetition } from '../../utils/replaceNationalTeamDetails';
import { useUpdateNationalTeamDetails } from '../../utils/useUpdateNationalTeamDetails';

export const OptaFootballFixturesTournament: React.FC<{
  season: string;
  competition: string;
  date_from?: string;
  date_to?: string;
  round?: string;
  full_width?: boolean;
}> = React.memo(({ season, competition, date_from, date_to, round, full_width }) => {
  const ref = React.createRef<HTMLDivElement>();

  const [isReady, setIsReady] = useState<boolean>(false);
  const isNationalComp = isNationalCompetition(competition);


  useEffect(() => {
    const sport = 'football';

    initSettings();
    initStyleSheet(sport);

    initScript().then(() => {
      if (ref.current) {
        ref.current.innerHTML = initElement(
          'opta-widget',
          {
            sport,
            widget: 'fixtures',
            season,
            competition,
            date_from,
            date_to,
            round,
            live: true,
            grouping: 'matchday',
            show_grouping: true,
            sub_grouping: 'date|matchday|group',
            show_subgrouping: true,
            show_crests: !isNationalComp,
            date_format: 'dddd MMMM D YYYY',
            breakpoints: 520
          },
          initElement('opta-widget', {
            sport,
            widget: 'match_summary',
            season: '',
            competition: '',
            match: '',
            live: true,
            show_crests: true,
            show_goals: true,
            show_cards: 'red',
            breakpoints: '520'
          })
        ).outerHTML;

        initComponent();
        setIsReady(true);
      }
    });
  }, []);

  isNationalComp && useUpdateNationalTeamDetails(ref, 'Opta-Team');

  return (
    <Container border={isReady} fullWidth={full_width}>
      <WidgetContainer ref={ref} isNationalComp={isNationalComp} />

      {!isReady && (
        <PlaceholderContainer>
          <Placeholder />
        </PlaceholderContainer>
      )}
    </Container>
  );
});