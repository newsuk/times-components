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

export const OptaFootballPlayerStats: React.FC<{
  season: string;
  competition: string;
  match: string;
  visible_categories: string; // goals | assists | cards_red | cards_yellow
  full_width?: boolean;
}> = React.memo(({ season, competition, match, full_width, visible_categories }) => {
  const ref = React.createRef<HTMLDivElement>();

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
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
          match,
          template: 'normal',
          graph_style: 'relative',
          visible_categories,
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

  // <opta-widget
  // navigation="tabs_more"
  // show_crests="false"
  // show_images="false"
  // show_ranks="true"
  // show_appearances="false"
  // visible_categories="goals"
  // limit="30"
  // hide_zeroes="true"
  // show_team_names="true"
  // team_naming="full"
  // player_naming="full" show_logo="true" show_title="true" breakpoints="400" sport="football"></opta-widget>

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
