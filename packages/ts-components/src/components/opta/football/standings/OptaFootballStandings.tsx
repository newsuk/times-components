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

export const OptaFootballStandings: React.FC<{
  season: string;
  competition: string;
  default_nav?: string;
  navigation?: boolean;
}> = ({ season, competition, default_nav = 1, navigation }) => {
  const ref = React.createRef<HTMLDivElement>();

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    initSettings();
    initStyleSheet();

    initScript().then(() => {
      if (ref.current) {
        ref.current.innerHTML = initElement('opta-widget', {
          sport: 'football',
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
  }, [ref]);

  return (
    <Container border={isReady}>
      <WidgetContainer ref={ref} />

      {!isReady && (
        <PlaceholderContainer>
          <Placeholder />
        </PlaceholderContainer>
      )}
    </Container>
  );
};
