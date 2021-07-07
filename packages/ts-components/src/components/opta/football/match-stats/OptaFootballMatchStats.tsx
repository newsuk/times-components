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

export const OptaFootballMatchStats: React.FC<{
  season: string;
  competition: string;
  match: string;
  full_width?: boolean;
}> = React.memo(({ season, competition, match, full_width }) => {
  const ref = React.createRef<HTMLDivElement>();

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    initSettings();
    initStyleSheet();

    initScript().then(() => {
      if (ref.current) {
        ref.current.innerHTML = initElement('opta-widget', {
          sport: 'football',
          widget: 'matchstats',
          season,
          competition,
          match,
          template: 'custom',
          graph_style: 'relative',
          stats_categories:
            'Category 1|possession,shots,shots_on_target,passes,passes_accuracy,corners_won,fouls_conceded,cards_yellow,cards_red',
          live: true,
          show_match_header: true,
          show_halftime_score: true,
          show_competition_name: true,
          show_date: true,
          show_crests: true,
          date_format: 'DD/MM/YYYY',
          breakpoints: '520'
        }).outerHTML;

        initComponent();
        setIsReady(true);
      }
    });
  }, []);

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
});
