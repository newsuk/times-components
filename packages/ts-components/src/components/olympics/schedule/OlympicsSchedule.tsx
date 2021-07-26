import React, { FC, useEffect, useState } from 'react';
import { Container } from './styles';
import { colours } from '@times-components/styleguide';

import { OlympicsKeys } from '../types';
import { Button } from '../medal-table/styles';
import { injectScript } from '../../../helpers/widgets/inject-script';

export const OlympicsSchedule: FC<{
  keys: OlympicsKeys;
  sectionColor?: string;
  wrapHelmetProvider?: boolean;
}> = ({
  keys: { endpoint, authToken, gamesCode },
  sectionColor = colours.section.sport
}) => {
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    injectScript(`${endpoint}/static/schedule.js`);
  }, []);

  return (
    <Container sectionColour={sectionColor} showAll={showAll}>
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
