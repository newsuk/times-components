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

export const OptaFootballSummary: React.FC<{
  season: string;
  competition: string;
  match: string;
}> = ({ season, competition, match }) => {
  const ref = React.createRef<HTMLDivElement>();

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    initSettings();
    initStyleSheet();

    initScript().then(() => {
      if (ref.current) {
        ref.current.innerHTML = initElement('opta-widget', {
          sport: 'football',
          widget: 'match_summary',
          season,
          competition,
          match,
          live: true,
          show_match_header: true,
          show_date: true,
          show_competition_name: true,
          show_crests: true,
          show_goals: true,
          show_cards: 'red',
          show_halftime_score: true,
          date_format: 'DD/MM/YYYY',
          breakpoints: '520'
        }).outerHTML;

        initComponent();
        setIsReady(true);
      }
    });
  }, []);

  return (
    <Container border={isReady}>
      <WidgetContainer ref={ref} />

      {!isReady && (
        <PlaceholderContainer>
          <Placeholder />
        </PlaceholderContainer>
      )}
    </Container>
  );
};
