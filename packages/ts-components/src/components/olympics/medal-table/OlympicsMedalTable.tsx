import React, { FC, useEffect, useState } from 'react';
import { Container } from './styles';
import { HeadingContainer, Heading, Button, Label } from '../shared-styles';
import { OlympicsKeys } from '../types';
import { injectScript } from '../../../helpers/widgets/inject-script';

export const OlympicsMedalTable: FC<{
  highlighted?: string;
  keys: OlympicsKeys;
  inArticle?: boolean;
}> = ({
  keys: { endpoint, authToken, gamesCode },
  highlighted = 'GBR',
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
    <Container showAll={showAll} inArticle={inArticle}>
      <HeadingContainer>
        <Label>Tokyo 2020</Label>
        <Heading>Olympic Medal Count</Heading>
      </HeadingContainer>
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
