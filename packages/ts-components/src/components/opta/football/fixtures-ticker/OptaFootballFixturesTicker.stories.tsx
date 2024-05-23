import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, withKnobs } from '@storybook/addon-knobs';

import { OptaFootballFixturesTicker } from './OptaFootballFixturesTicker';
const competitons = [
  '1',
  '2',
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
        season={text('season', '2023')}
        competition={selComp}
        date_from=""
        date_to=""
      />
    );
  });
