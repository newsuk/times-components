import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import {
  // format,
  addMinutes
} from 'date-fns';
// import { utcToZonedTime } from 'date-fns-tz';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import ArticleHeader from './ArticleHeader';

const getAttributes = () => {
  const id = 'Options';

  const now = new Date();
  const updated = text('Updated', addMinutes(now, -10).toISOString(), id);

  // const now = utcToZonedTime(new Date(), 'Europe/London');
  // const date = text('Date', format(now, 'dd/MM/yyyy'), id);
  // const time = text('Time', format(addMinutes(now, -10), 'HH:mm'), id);

  const options = { True: 'true', False: undefined };
  const breaking = select('Breaking', options, 'true', id);

  const headline = text('Headline', 'This is the headline', id);

  return { updated, breaking, headline };
};

storiesOf('Typescript Component/Article Header', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <ArticleHarness>{storyFn()}</ArticleHarness>
  ))
  .add('Article Header with headline', () => {
    const props = getAttributes();
    return (
      <ArticleHeader
        updated={props.updated}
        // date={props.date}
        // time={props.time}
        breaking={props.breaking}
        headline={encodeURIComponent(props.headline)}
      />
    );
  })
  .add('Article Header without headline', () => {
    const props = getAttributes();
    return (
      <ArticleHeader
        updated={props.updated}
        // date={props.date}
        // time={props.time}
        breaking={props.breaking}
      />
    );
  });
