import React, { FC, useEffect } from 'react';
<<<<<<< HEAD

=======
>>>>>>> Remove show all buttons
import { Container } from './styles';
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
<<<<<<< HEAD
=======

>>>>>>> Remove show all buttons
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

  return (
<<<<<<< HEAD
    <Container sectionColour={sectionColor} inArticle={inArticle}>
=======
    <Container sectionColour={sectionColor}>
>>>>>>> Remove show all buttons
      <div
        className="pa-schedule"
        data-auth-token={authToken}
        data-games-code={gamesCode}
      />
    </Container>
  );
};
