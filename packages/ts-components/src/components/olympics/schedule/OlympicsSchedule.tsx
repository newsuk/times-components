import React, { FC, useEffect, useState } from 'react';

import { Container } from './styles';
import { HeadingContainer, Heading, Button } from '../shared-styles';
import { colours } from '@times-components/styleguide';

import { OlympicsKeys } from '../types';
import { injectScript } from '../../../helpers/widgets/inject-script';

export const OlympicsSchedule: FC<{
  keys: OlympicsKeys;
  sectionColor?: string;
  inArticle?: boolean;
}> = ({
  keys: { endpoint, authToken, gamesCode },
  sectionColor = colours.section.sport,
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
    <Container
      sectionColour={sectionColor}
      inArticle={inArticle}
      showAll={showAll}
    >
      <HeadingContainer>
        <Heading sectionColour={sectionColor}>
          Event Schedule - Olympics Tokyo 2020
        </Heading>
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
