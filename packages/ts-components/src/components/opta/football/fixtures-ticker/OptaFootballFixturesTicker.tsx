import React, { useState, useEffect } from 'react';

import { Placeholder } from '@times-components/image';

import {
  initSettings,
  initStyleSheet,
  initScript,
  initElement,
  initComponent
} from '../../utils/config';

import { PlaceholderContainer } from '../shared-styles';
import { Container, WidgetContainer } from './styles';
import { isNationalCompetition } from '../../utils/replaceNationalTeamDetails';
import { useUpdateNationalTeamDetails } from '../../utils/useUpdateNationalTeamDetails';
import { useFixturePageLink } from '../../utils/useFixturePageLink';

export const OptaFootballFixturesTicker: React.FC<{
  season: string;
  competition: string;
  date_from?: string;
  date_to?: string;
  days_ahead?: number;
  days_before?: number;
  round?: string;
  isApp?: boolean;
  showButtons?: boolean;
  fixturesPageUrl?: string;
}> = React.memo(
  ({
    season,
    competition,
    date_from,
    date_to,
    days_ahead,
    days_before,
    round,
    isApp,
    showButtons,
    fixturesPageUrl
  }) => {
    const ref = React.createRef<HTMLDivElement>();

    const [isReady, setIsReady] = useState<boolean>(false);
    const isNationalComp = isNationalCompetition(competition);

    useEffect(
      () => {
        const sport = 'football';

        initSettings();
        initStyleSheet(sport);

        initScript().then(() => {
          if (ref.current) {
            ref.current.innerHTML = initElement('opta-widget', {
              sport,
              widget: 'fixtures',
              season,
              competition,
              date_from,
              date_to,
              days_ahead,
              days_before,
              round,
              live: true,
              start_on_current: true,
              template: 'strip',
              team_naming: 'brief',
              match_status: 'all',
              order_by: 'date_ascending',
              show_grouping: true,
              show_crests: !isNationalComp,
              show_date: true,
              show_live: true,
              date_format: 'ddd Do MMM',
              fixture_width: 160,
              breakpoints: 520
            }).outerHTML;

            initComponent();
            setIsReady(true);
          }
        });
      },
      [ref]
    );

    fixturesPageUrl &&
      !isApp &&
      useFixturePageLink(ref, 'Opta-Room', fixturesPageUrl);

    isNationalComp && useUpdateNationalTeamDetails(ref, 'Opta-TeamName');

    return (
      <Container>
        <WidgetContainer isApp={isApp} showButtons={showButtons} ref={ref} />

        {!isReady && (
          <PlaceholderContainer height={80}>
            <Placeholder />
          </PlaceholderContainer>
        )}
      </Container>
    );
  }
);
