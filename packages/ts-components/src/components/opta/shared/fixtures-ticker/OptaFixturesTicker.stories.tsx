import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  select,
  text,
  number,
  boolean,
  withKnobs
} from '@storybook/addon-knobs';

import { OptaFixturesTicker } from './OptaFixturesTicker';
const footballCompetitons = [
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
const rugbyCompetitons = ['209', '201', '221', '242'];

storiesOf('Typescript Component/In Article/Rugby/Fixtures', module)
  .addDecorator(withKnobs)
  .add('Rugby Fixtures Ticker', () => {
    const selComp = select('Competition', rugbyCompetitons, '221');
    return (
      <OptaFixturesTicker
        season={text('season', '2025')}
        competition={selComp}
        date_from=""
        date_to=""
        days_ahead={
          boolean('with daysahead', false)
            ? number('days ahead (of current day)', 100)
            : undefined
        }
        days_before={
          boolean('with daysbefore', false)
            ? number('days before (of current day)', 100)
            : undefined
        }
        round={text('round(s)', '')}
        sport="rugby"
        isApp={boolean('isApp', false)}
      />
    );
  });

storiesOf('Typescript Component/In Article/Football/Fixtures', module)
  .addDecorator(withKnobs)
  .add('Football Fixtures Ticker', () => {
    const selComp = select('Competition', footballCompetitons, '1');
    return (
      <OptaFixturesTicker
        season={text('season', '2024')}
        competition={selComp}
        date_from=""
        date_to=""
        days_ahead={
          boolean('with daysahead', false)
            ? number('days ahead (of current day)', 100)
            : undefined
        }
        days_before={
          boolean('with daysbefore', false)
            ? number('days before (of current day)', 100)
            : undefined
        }
        round={text('round(s)', '')}
        sport="football"
      />
    );
  });

storiesOf('Typescript Component/In Article/Football/Fixtures', module)
  .addDecorator(withKnobs)
  .add('Fixtures Ticker buttons and link', () => {
    const selComp = select('Competition', footballCompetitons, '1');
    return (
      <OptaFixturesTicker
        season={text('season', '2024')}
        competition={selComp}
        date_from=""
        date_to=""
        days_ahead={
          boolean('with daysahead', false)
            ? number('days ahead (of current day)', 100)
            : undefined
        }
        days_before={
          boolean('with daysbefore', false)
            ? number('days before (of current day)', 100)
            : undefined
        }
        round={text('round(s)', '')}
        fixturesPageUrl="https://www.thetimes.co.uk/sport/football/euro-2024"
        sport="football"
        showButtons
      />
    );
  });
