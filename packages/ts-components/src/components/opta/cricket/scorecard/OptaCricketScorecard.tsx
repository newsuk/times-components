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

export const OptaCricketScorecard: React.FC<{
  competition: string;
  match: string;
  full_width?: boolean;
}> = React.memo(({ competition, match, full_width }) => {
  const ref = React.createRef<HTMLDivElement>();

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const sport = 'cricket';

    initSettings();
    initStyleSheet(sport);

    initScript().then(() => {
      if (ref.current) {
        ref.current.innerHTML = initElement('opta-widget', {
          sport,
          widget: 'score_card',
          season: '0',
          competition,
          match,
          template: 'normal',
          live: true,
          show_match_header: true,
          show_crests: true,
          show_competition_name: true,
          show_match_description: true,
          show_date: true,
          date_format: 'DD/MM/YYYY',
          show_venue: true,
          show_officials: false,
          show_toss: false,
          show_state_of_play: true,
          navigation: 'tabs',
          show_batting: true,
          show_mins_batted: true,
          show_fours: true,
          show_sixes: true,
          show_strike_rate: true,
          show_bowling: true,
          show_economy: true,
          show_fow: true,
          player_naming: 'last_name',
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
