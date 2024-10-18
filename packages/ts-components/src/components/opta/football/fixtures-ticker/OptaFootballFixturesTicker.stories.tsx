import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, number, withKnobs } from '@storybook/addon-knobs';

import { OptaFootballFixturesTicker } from './OptaFootballFixturesTicker';
const competitons = [
  '1',
  '2',
  '3',
  '5',
  '6',
  '8',
  '10',
  '14',
  '38',
  '80',
  '235',
  '941',
  '1125'
];

storiesOf('Typescript Component/In Article/Football/Fixtures', module)
  .addDecorator(withKnobs)
  .add('Fixtures Ticker', () => {
    const selComp = select('Competition', competitons, '8');
    return (
      <OptaFootballFixturesTicker
        season={text('season', '2024')}
        competition={selComp}
        date_from=""
        date_to=""
        days_ahead={number('days ahead (of current day)', 100)}
        days_before={number('days before (of current day)', 100)}
        round={text('round(s)', '')}
      />
    );
  });

storiesOf('Typescript Component/In Article/Football/Fixtures', module)
  .addDecorator(withKnobs)
  .add('Fixtures Ticker buttons and link', () => {
    const selComp = select('Competition', competitons, '8');
    return (
      <OptaFootballFixturesTicker
        season={text('season', '2024')}
        competition={selComp}
        date_from=""
        date_to=""
        days_ahead={number('days ahead (of current day)', 100)}
        days_before={number('days before (of current day)', 100)}
        round={text('round(s)', '')}
        fixturesPageUrl="https://www.thetimes.co.uk/sport/football/euro-2024"
        showButtons
      />
    );
  });
