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

export const OptaFootballPlayerStats: React.FC<{
  season: string;
  competition: string;
  visible_categories: string; // goals | assists | cards_red | cards_yellow
  show_title?: boolean;
  full_width?: boolean;
}> = React.memo(
  ({
    season,
    competition,
    full_width,
    show_title = true,
    visible_categories
  }) => {
    const ref = React.createRef<HTMLDivElement>();

    const [isReady, setIsReady] = useState<boolean>(false);
    const isNationalComp = isNationalCompetition(competition);

    useEffect(
      () => {
        const sport = 'football';

        initSettings();
        initStyleSheet(sport);

        initScript().then(() => {
          if (ref.current) {
            ref.current.innerHTML = initElement('opta-widget', {
              sport,
              widget: 'player_ranking',
              season,
              competition,
              template: 'normal',
              graph_style: 'relative',
              visible_categories,
              live: true,
              show_match_header: true,
              show_halftime_score: true,
              show_competition_name: true,
              show_date: true,
              show_crests: true,
              show_title,
              date_format: 'DD/MM/YYYY',
              breakpoints: '520'
            }).outerHTML;

            initComponent();
            setIsReady(true);
          }
        });
      },
      [ref]
    );

    isNationalComp && useUpdateNationalTeamDetails(ref, 'Opta-Image-Team');

    return (
      <Container border={isReady} fullWidth={full_width}>
        <WidgetContainer ref={ref} />

        {!isReady && (
          <PlaceholderContainer>
            <Placeholder />
          </PlaceholderContainer>
        )}
      </Container>
    );
  }
);
