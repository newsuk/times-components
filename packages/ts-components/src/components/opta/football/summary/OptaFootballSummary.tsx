import React, { useState, useEffect } from 'react';

import { Placeholder } from '@times-components/image';

import {
  initSettings,
  initStyleSheet,
  initScript,
  initElement,
  initComponent
} from '../../utils/config';

import { Container, PlaceholderContainer } from '../../shared/shared-styles';
import { WidgetContainer } from './styles';

export const OptaFootballSummary: React.FC<{
  season: string;
  competition: string;
  match: string;
  full_width?: boolean;
  heightSm?: number;
  heightMd?: number;
  heightLg?: number;
}> = React.memo(
  ({
    season,
    competition,
    match,
    full_width,
    heightSm,
    heightMd,
    heightLg
  }) => {
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
            widget: 'match_summary',
            season,
            competition,
            match,
            live: true,
            show_match_header: true,
            show_halftime_score: true,
            show_competition_name: true,
            show_date: true,
            show_crests: true,
            show_goals: true,
            show_cards: 'red',
            date_format: 'DD/MM/YYYY',
            breakpoints: '520'
          }).outerHTML;

          initComponent();
          setIsReady(true);
        }
      });
    }, []);

    return (
      <Container
        fullWidth={full_width}
        heightSm={heightSm}
        heightMd={heightMd}
        heightLg={heightLg}
      >
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
