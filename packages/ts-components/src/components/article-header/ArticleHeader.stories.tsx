import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import { format } from 'date-fns';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import ArticleHeader from './ArticleHeader';

const getAttributes = () => {
  const id = 'Options';

  const now = new Date();
  const date = text('Date', format(now, 'dd/MM/yyyy'), id);
  const time = text('Time', format(now, 'HH:mm'), id);

  const options = { True: 'true', False: undefined };
  const breaking = select('Breaking', options, 'true', id);

  const headline = text('Headline', 'This is the headline', id);

  return { date, time, breaking, headline };
};

storiesOf('Typescript Component/Article Header', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <ArticleHarness>{storyFn()}</ArticleHarness>
  ))
  .add('Article Header with headline', () => {
    const props = getAttributes();
    return (
      <ArticleHeader
        date={props.date}
        time={props.time}
        breaking={props.breaking}
        headline={encodeURIComponent(props.headline)}
      />
    );
  })
  .add('Article Header without headline', () => {
    const props = getAttributes();
    return (
      <ArticleHeader
        date={props.date}
        time={props.time}
        breaking={props.breaking}
      />
    );
  });
