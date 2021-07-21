import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from './styles';
import { colours } from '@times-components/styleguide';

import { OlympicsKeys } from '../types';

export const OlympicsSchedule: FC<{ keys: OlympicsKeys }> = ({
  keys: { endpoint, authToken, gamesCode }
}) => (
  <Container sectionColour={colours.section.sport}>
    <Helmet>
      <script src={`${endpoint}/static/schedule.js`} charSet="UTF-8" defer />
    </Helmet>
    <div
      className="pa-schedule"
      data-auth-token={authToken}
      data-games-code={gamesCode}
    />
  </Container>
);
