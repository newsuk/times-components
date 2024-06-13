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
import { isNationalCompetition } from '../../utils/replaceNationalTeamDetails';
import { useUpdateNationalTeamDetails } from '../../utils/useUpdateNationalTeamDetails';

export const OptaFootballStandings: React.FC<{
  season: string;
  competition: string;
  default_nav?: string;
  classes?: string;
  navigation?: boolean;
  full_width?: boolean;
  show_title?: boolean;
  columns?: boolean;
}> = React.memo(
  ({
    season,
    competition,
    default_nav = 1,
    classes,
    navigation,
    show_title = true,
    full_width,
    columns
  }) => {
    const ref = React.createRef<HTMLDivElement>();

    const [isReady, setIsReady] = useState<boolean>(false);
    const isNationalComp = isNationalCompetition(competition);

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

    isNationalComp && useUpdateNationalTeamDetails(ref, 'Opta-Team');

    return (
      <Container border={isReady} fullWidth={full_width} className={classes}>
        <WidgetContainer ref={ref} columns={columns} />

        {!isReady && (
          <PlaceholderContainer>
            <Placeholder />
          </PlaceholderContainer>
        )}
      </Container>
    );
  }
);
