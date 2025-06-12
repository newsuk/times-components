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
import { isNationalCompetition } from '../../utils/replaceTeamDetails';
import { useUpdateNationalTeamDetails } from '../../utils/useUpdateNationalTeamDetails';

export const OptaFootballPlayerStats: React.FC<{
  season: string;
  competition: string;
  visible_categories: string; // goals | assists | cards_red | cards_yellow
  classes?: string;
  hide_zeroes?: boolean;
  show_title?: boolean;
  full_width?: boolean;
  heightSm?: number;
  heightMd?: number;
  heightLg?: number;
}> = React.memo(
  ({
    season,
    competition,
    full_width,
    hide_zeroes = true,
    show_title = true,
    visible_categories,
    classes,
    heightSm,
    heightMd,
    heightLg
  }) => {
    const ref = React.createRef<HTMLDivElement>();

    const [isReady, setIsReady] = useState<boolean>(false);
    const isNationalComp = isNationalCompetition(competition);
    const isHeight = heightSm || heightMd || heightLg;

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
              hide_zeroes,
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
              breakpoints: '200'
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
      <Container
        border={isReady}
        fullWidth={full_width}
        className={classes}
        heightSm={heightSm}
        heightMd={heightMd}
        heightLg={heightLg}
      >
        <WidgetContainer ref={ref} />

        {!isReady && (
          <PlaceholderContainer isHeight={!!isHeight}>
            <Placeholder />
          </PlaceholderContainer>
        )}
      </Container>
    );
  }
);
