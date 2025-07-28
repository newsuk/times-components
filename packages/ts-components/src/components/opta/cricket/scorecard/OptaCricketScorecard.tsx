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
import { hasMatchEvents } from '../../utils/hasMatchEvents';
import Button from '../../shared/button/Button';

export const OptaCricketScorecard: React.FC<{
  competition: string;
  match: string;
  full_width?: boolean;
  heightSm?: number;
  heightMd?: number;
  heightLg?: number;
}> = React.memo(
  ({
    competition,
    match,
    full_width,
    heightSm = 258,
    heightMd = 258,
    heightLg = 258
  }) => {
    const ref = React.createRef<HTMLDivElement>();
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [disabledButton, setDisabledButton] = useState<boolean>(true);

    useEffect(() => {
      const sport = 'cricket';

      const handleMessage = (event: MessageEvent) => {
        if (event.data === 'enableButton') {
          setDisabledButton(false);
        }
      };

      window.addEventListener('message', handleMessage);

      initSettings();
      initStyleSheet(sport);

      initScript()
        .then(() => {
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
              show_mins_batted: false,
              show_fours: true,
              show_sixes: true,
              show_strike_rate: true,
              show_bowling: true,
              show_economy: true,
              show_fow: true,
              player_naming: 'full',
              breakpoints: '520'
            }).outerHTML;

            initComponent();
          }
        })
        .then(() => {
          hasMatchEvents(true);
        });

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }, []);

    return (
      <Container
        fullWidth={full_width}
        heightSm={heightSm}
        heightMd={heightMd}
        heightLg={heightLg}
        hasPadding
      >
        <WidgetContainer ref={ref} showDetails={showDetails} />

        <Button
          onClick={() => setShowDetails(!showDetails)}
          disabled={disabledButton}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>

        <PlaceholderContainer className="opta-placeholder">
          <Placeholder />
        </PlaceholderContainer>
      </Container>
    );
  }
);
