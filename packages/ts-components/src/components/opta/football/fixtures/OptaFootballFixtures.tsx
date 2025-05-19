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

export const OptaFootballFixtures: React.FC<{
  season: string;
  competition: string;
  date_from: string;
  date_to: string;
  full_width?: boolean;
  heightSm?: number;
  heightMd?: number;
  heightLg?: number;
}> = React.memo(({
  season,
  competition,
  date_from,
  date_to,
  full_width,
  heightSm,
  heightMd,
  heightLg
}) => {
  const ref = React.createRef<HTMLDivElement>();

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const sport = 'football';

    initSettings();
    initStyleSheet(sport);

    initScript().then(() => {
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
            live: true,
            grouping: 'date',
            show_grouping: true,
            show_crests: true,
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
        setIsReady(true);
      }
    });
  }, []);

  return (
    <Container
      border={isReady}
      fullWidth={full_width}
      heightSm={heightSm}
      heightMd={heightMd}
      heightLg={heightLg}
    >
      <WidgetContainer ref={ref} />

      {!isReady && (
        <PlaceholderContainer isHeight>
          <Placeholder />
        </PlaceholderContainer>
      )}
    </Container>
  );
});
