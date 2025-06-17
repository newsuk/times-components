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

export const OptaFootballStandings: React.FC<{
  season: string;
  competition: string;
  default_nav?: string;
  classes?: string;
  navigation?: boolean;
  full_width?: boolean;
  show_title?: boolean;
  columns?: boolean;
  heightSm?: number;
  heightMd?: number;
  heightLg?: number;
}> = React.memo(
  ({
    season,
    competition,
    default_nav = 1,
    classes,
    navigation,
    show_title = true,
    full_width,
    columns,
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
            ref.current.innerHTML = initElement('opta-widget', {
              sport,
              widget: 'standings',
              season,
              competition,
              live: true,
              navigation: navigation ? 'dropdown' : undefined,
              default_nav,
              show_title,
              show_crests: !isNationalComp,
              team_naming: 'brief',
              breakpoints: 520
            }).outerHTML;

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
        <WidgetContainer ref={ref} columns={columns} />

        <PlaceholderContainer className="opta-placeholder">
          <Placeholder />
        </PlaceholderContainer>
      </Container>
    );
  }
);
