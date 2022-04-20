import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import ArticleHeader from './ArticleHeader';

storiesOf('Typescript Component/Article Header', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <ArticleHarness>{storyFn()}</ArticleHarness>
  ))
  .add('Article Header with headline', () => {
    const groupId = 'Options';

    // const label = 'Updated Date/Time';
    // const defaultValue = new Date();
    // const value = date(label, defaultValue, groupId);
    // const updated = new Date(value).toISOString();

    const breakingOptions = { True: 'true', False: undefined };
    const headline = text('Headline', 'This is the headline', groupId);

    return (
      <ArticleHeader
        date={'20/04/2022'}
        time={'18:30'}
        breaking={select('Breaking', breakingOptions, undefined, groupId)}
        headline={encodeURIComponent(headline)}
      />
    );
  })
  .add('Article Header without headline', () => {
    const groupId = 'Options';

    // const label = 'Updated Date/Time';
    // const defaultValue = new Date();
    // const value = date(label, defaultValue, groupId);
    // const updated = new Date(value).toISOString();

    const breakingOptions = { True: 'true', False: undefined };

    return (
      <ArticleHeader
        date={'31/12/2021'}
        time={'21:30'}
        breaking={select('Breaking', breakingOptions, undefined, groupId)}
      />
    );
  });
