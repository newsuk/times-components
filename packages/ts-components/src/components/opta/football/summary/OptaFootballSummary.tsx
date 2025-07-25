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
import { WidgetContainer } from '../../shared/summary-styles';
import Button from '../../shared/button/Button';
import { hasMatchEvents } from '../../utils/hasMatchEvents';

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
    heightSm = 197,
    heightMd = 197,
    heightLg = 197
  }) => {
    const ref = React.createRef<HTMLDivElement>();
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [disabledButton, setDisabledButton] = useState<boolean>(true);

    useEffect(() => {
      const sport = 'football';

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
          }
        })
        .then(() => {
          hasMatchEvents();
        }
      );

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
