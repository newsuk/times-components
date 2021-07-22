import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from './styles';
import { colours } from '@times-components/styleguide';

import { OlympicsKeys } from '../types';
import { Button } from '../medal-table/styles';

export const OlympicsSchedule: FC<{
  keys: OlympicsKeys;
  sectionColor?: string;
}> = ({
  keys: { endpoint, authToken, gamesCode },
  sectionColor = colours.section.sport
}) => {
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <Container sectionColour={sectionColor} showAll={showAll}>
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
