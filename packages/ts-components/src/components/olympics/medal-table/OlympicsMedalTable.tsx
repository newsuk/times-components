import React, { FC, useEffect, useState } from 'react';
import { colours } from '@times-components/styleguide';
import { Container, Button } from './styles';
import { OlympicsKeys } from '../types';
import { injectScript } from '../../../helpers/widgets/inject-script';

export const OlympicsMedalTable: FC<{
  highlighted?: string;
  keys: OlympicsKeys;
  sectionColor?: string;
  inArticle?: boolean;
}> = ({
  keys: { endpoint, authToken, gamesCode },
  highlighted = 'GBR',
  sectionColor = colours.section.sport,
  inArticle = true
}) => {
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  useEffect(() => {
    injectScript(`${endpoint}/static/medal-table.js`);
  }, []);

  return (
    <Container
      sectionColour={sectionColor}
      showAll={showAll}
      inArticle={inArticle}
    >
      <div
        className="pa-medaltable"
        data-auth-token={authToken}
        data-games-code={gamesCode}
        data-org-code={highlighted}
        data-medal-icon-type="round"
      />
      <div className="buttonContainer">
        <Button onClick={handleShowAll}>
          {showAll ? 'Collapse' : 'Show All'}
        </Button>
      </div>
    </Container>
  );
};
