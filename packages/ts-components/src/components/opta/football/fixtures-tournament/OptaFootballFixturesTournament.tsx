import React, { useEffect } from 'react';

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
import {
  isNationalCompetition,
  replaceTeamName
} from '../../utils/replaceTeamDetails';

export const OptaFootballFixturesTournament: React.FC<{
  season: string;
  competition: string;
  date_from?: string;
  date_to?: string;
  days_ahead?: number;
  days_before?: number;
  matchday?: string;
  round?: string;
  classes?: string;
  show_title?: boolean;
  hide_matchday?: boolean;
  columns?: boolean;
  full_width?: boolean;
  heightSm?: number;
  heightMd?: number;
  heightLg?: number;
}> = React.memo(
  ({
    season,
    competition,
    date_from,
    date_to,
    days_ahead,
    days_before,
    matchday,
    round,
    classes,
    hide_matchday,
    show_title = true,
    columns = true,
    full_width,
    heightSm,
    heightMd,
    heightLg
  }) => {
    const ref = React.createRef<HTMLDivElement>();
    const isNationalComp = isNationalCompetition(competition, 'football');

    useEffect(() => {
      const sport = 'football';

      initSettings();
      initStyleSheet(sport);

      initScript()
        .then(() => {
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
                days_ahead,
                days_before,
                matchday,
                round,
                show_title,
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
          }
        })
        .then(() => {
          replaceTeamName();
        });
    }, []);

    return (
      <Container
        fullWidth={full_width}
        className={classes}
        heightSm={heightSm}
        heightMd={heightMd}
        heightLg={heightLg}
      >
        <PlaceholderContainer className="opta-placeholder">
          <Placeholder />
        </PlaceholderContainer>

        <WidgetContainer
          ref={ref}
          isNationalComp={isNationalComp}
          hide_matchday={hide_matchday}
          columns={columns}
        />
      </Container>
    );
  }
);
