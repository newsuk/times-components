import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from './styles';
import { colours } from '@times-components/styleguide';

import { OlympicsKeys } from '../types';
import { Button } from '../medal-table/styles';

export const OlympicsSchedule: FC<{ keys: OlympicsKeys }> = ({
  keys: { endpoint, authToken, gamesCode }
}) => {
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <Container sectionColour={colours.section.sport} showAll={showAll}>
      <Helmet>
        <script src={`${endpoint}/static/schedule.js`} charSet="UTF-8" defer />
      </Helmet>
      <div
        className="pa-schedule"
        data-auth-token={authToken}
        data-games-code={gamesCode}
      />
      <div className="buttonContainer">
        <Button onClick={handleShowAll}>
          {showAll ? 'Collapse' : 'Show All'}
        </Button>
      </div>
    </Container>
  );
};
