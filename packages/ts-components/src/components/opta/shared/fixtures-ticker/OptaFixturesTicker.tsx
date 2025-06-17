import React, { useEffect } from 'react';

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
import {
  isNationalCompetition,
  replaceTeamName
} from '../../utils/replaceTeamDetails';
import { useFixturePageLink } from '../../utils/useFixturePageLink';

export type OptaSport = 'cricket' | 'rugby' | 'football';

export type OptaFixturesTickerProps = {
  season: string;
  competition: string;
  date_from?: string | null;
  date_to?: string | null;
  days_ahead?: number;
  days_before?: number;
  round?: string;
  isApp?: boolean;
  showButtons?: boolean;
  fixturesPageUrl?: string;
  sport: OptaSport;
};

export const OptaFixturesTicker: React.FC<OptaFixturesTickerProps> = React.memo(
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
    fixturesPageUrl,
    sport
  }) => {
    const ref = React.createRef<HTMLDivElement>();
    const isNationalComp = isNationalCompetition(competition, sport);

    useEffect(
      () => {
        initSettings();
        initStyleSheet(sport);

        initScript()
          .then(() => {
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
            }
          })
          .then(() => {
            replaceTeamName();
          });
      },
      [ref]
    );

    fixturesPageUrl &&
      !isApp &&
      useFixturePageLink(ref, 'Opta-Room', fixturesPageUrl);

    return (
      <Container>
        <PlaceholderContainer className="opta-placeholder">
          <Placeholder />
        </PlaceholderContainer>
        <WidgetContainer isApp={isApp} showButtons={showButtons} ref={ref} />
      </Container>
    );
  }
);
