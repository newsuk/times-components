import React, { FC, useEffect, useState } from 'react';

import { Container } from './styles';
import { HeadingContainer, Label, Button, Heading } from '../shared-styles';

import { injectScript } from '../../../helpers/widgets/inject-script';
import { OlympicsKeys, config } from '../OlympicsKeys';

export const OlympicsSchedule: FC<{
  keys?: OlympicsKeys;
  inArticle?: boolean;
}> = ({
  keys: { endpoint, authToken, gamesCode } = config.prod,
  inArticle = true
}) => {
  useEffect(() => {
    injectScript(`${endpoint}/static/schedule.js`);
  }, []);

  useEffect(() => {
    window.addEventListener(
      'wheel',
      event => {
        if (
          event
            .composedPath()
            // @ts-ignore
            .includes(document.querySelector('.pa_UnitListView_ctr'))
        ) {
          event.stopImmediatePropagation();
        }
      },
      true
    );
  }, []);

  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <Container inArticle={inArticle} showAll={showAll}>
      <HeadingContainer>
        <Label>Tokyo 2020</Label>
        <Heading>Event Schedule</Heading>
      </HeadingContainer>
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
