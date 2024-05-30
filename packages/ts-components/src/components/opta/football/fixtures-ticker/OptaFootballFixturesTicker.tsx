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
import { WidgetContainer } from './styles';
import { isNationalCompetition } from '../../utils/replaceNationalTeamDetails';
import { useUpdateNationalTeamDetails } from '../../utils/useUpdateNationalTeamDetails';

export const OptaFootballFixturesTicker: React.FC<{
  season: string;
  competition: string;
  date_from?: string;
  date_to?: string;
  days_ahead?: number;
  days_before?: number;
  round?: string;
}> = React.memo(
  ({
    season,
    competition,
    date_from,
    date_to,
    days_ahead,
    days_before,
    round
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
              date_format: 'ddd Do MMM'
            }).outerHTML;

            initComponent();
            setIsReady(true);
          }
        });
      },
      [ref]
    );

    isNationalComp && useUpdateNationalTeamDetails(ref, 'Opta-TeamName');

    return (
      <>
        <WidgetContainer ref={ref} />

        {!isReady && (
          <PlaceholderContainer height={100}>
            <Placeholder />
          </PlaceholderContainer>
        )}
      </>
    );
  }
);
