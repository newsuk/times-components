import React, { FC, useEffect } from 'react';

import { Container } from './styles';
import { colours } from '@times-components/styleguide';

import { OlympicsKeys } from '../types';
import { injectScript } from '../../../helpers/widgets/inject-script';

export const OlympicsSchedule: FC<{
  keys: OlympicsKeys;
  sectionColor?: string;
  wrapHelmetProvider?: boolean;
}> = ({
  keys: { endpoint, authToken, gamesCode },
  sectionColor = colours.section.sport
}) => {
  useEffect(() => {
    injectScript(`${endpoint}/static/schedule.js`);
  }, []);

  return (
    <Container sectionColour={sectionColor}>
      <div
        className="pa-schedule"
        data-auth-token={authToken}
        data-games-code={gamesCode}
      />
    </Container>
  );
};
