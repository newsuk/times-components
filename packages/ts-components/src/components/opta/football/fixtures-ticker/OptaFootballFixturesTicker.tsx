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

export const OptaFootballFixturesTicker: React.FC<{
  season: string;
  competition: string;
  date_from?: string;
  date_to?: string;
  full_width?: boolean;
}> = React.memo(({ season, competition, date_from, date_to, full_width }) => {
  const ref = React.createRef<HTMLDivElement>();

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
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
          live: true,
          start_on_current: true,
          template: 'strip',
          team_naming: 'brief',
          match_status: 'all',
          order_by: 'date_ascending',
          show_grouping: true,
          show_crests: true,
          show_date: true,
          date_format: 'ddd Do MMM'
        }).outerHTML;

        initComponent();
        setIsReady(true);
      }
    });
  }, []);

  return (
    <Container border={false} fullWidth={full_width}>
      <WidgetContainer ref={ref} />

      {!isReady && (
        <PlaceholderContainer>
          <Placeholder />
        </PlaceholderContainer>
      )}
    </Container>
  );
});
