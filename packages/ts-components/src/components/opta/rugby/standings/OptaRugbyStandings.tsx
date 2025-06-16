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

export const OptaRugbyStandings: React.FC<{
  season: string;
  competition: string;
  default_nav?: string;
  navigation?: boolean;
  full_width?: boolean;
  heightSm?: number;
  heightMd?: number;
  heightLg?: number;
}> = React.memo(
  ({
    season,
    competition,
    default_nav = 1,
    navigation,
    full_width,
    heightSm,
    heightMd,
    heightLg
  }) => {
    const ref = React.createRef<HTMLDivElement>();

    const [isReady, setIsReady] = useState<boolean>(false);
    const isHeight = heightSm || heightMd || heightLg;

    useEffect(() => {
      const sport = 'rugby';

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
            show_crests: true,
            breakpoints: 520
          }).outerHTML;

          initComponent();
          setIsReady(true);
        }
      });
    }, []);

    return (
      <Container
        fullWidth={full_width}
        heightSm={heightSm}
        heightMd={heightMd}
        heightLg={heightLg}
      >
        <WidgetContainer ref={ref} />

        {!isReady && (
          <PlaceholderContainer>
            <Placeholder />
          </PlaceholderContainer>
        )}
      </Container>
    );
  }
);
