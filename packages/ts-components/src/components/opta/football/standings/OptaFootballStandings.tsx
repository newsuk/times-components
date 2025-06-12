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
import { useUpdateTeamDetails } from '../../utils/useUpdateTeamDetails';

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

    const [isReady, setIsReady] = useState<boolean>(false);
    const isNationalComp = isNationalCompetition(competition, 'football');
    const isHeight = heightSm || heightMd || heightLg;

    useEffect(() => {
      const sport = 'football';

      initSettings();
      initStyleSheet(sport);

      initScript().then(() => {
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
          setIsReady(true);
        }
      });
    }, []);

    useUpdateTeamDetails('football', competition, ref, 'Opta-TeamName');

    return (
      <Container
        border={isReady}
        fullWidth={full_width}
        className={classes}
        heightSm={heightSm}
        heightMd={heightMd}
        heightLg={heightLg}
      >
        <WidgetContainer ref={ref} columns={columns} />

        {!isReady && (
          <PlaceholderContainer isHeight={!!isHeight}>
            <Placeholder />
          </PlaceholderContainer>
        )}
      </Container>
    );
  }
);
