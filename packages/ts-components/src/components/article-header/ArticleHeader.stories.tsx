import React from 'react';
import { storiesOf } from '@storybook/react';
import { date, select, text } from '@storybook/addon-knobs';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import ArticleHeader from './ArticleHeader';

storiesOf('Typescript Component/Article Header', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <ArticleHarness>{storyFn()}</ArticleHarness>
  ))
  .add('Article Header with headline', () => {
    const label = 'Updated Date/Time';
    const defaultValue = new Date();
    const groupId = 'Options';
    const value = date(label, defaultValue, groupId);
    const breakingOptions = {
      True: 'true',
      False: undefined
    };
    const updated = new Date(value).toISOString();

    const headline = text('Headline', 'This is the headline', groupId);

    return (
      <ArticleHeader
        updated={updated}
        breaking={select('Breaking', breakingOptions, undefined, groupId)}
        headline={encodeURIComponent(headline)}
      />
    );
  })
  .add('Article Header without headline', () => {
    const label = 'Updated Date/Time';
    const defaultValue = new Date();
    const groupId = 'Options';
    const value = date(label, defaultValue, groupId);
    const breakingOptions = {
      True: 'true',
      False: undefined
    };
    const updated = new Date(value).toISOString();

    return (
      <ArticleHeader
        updated={updated}
        breaking={select('Breaking', breakingOptions, undefined, groupId)}
      />
    );
  });
