import React from 'react';
import { storiesOf } from '@storybook/react';
import { date, boolean } from '@storybook/addon-knobs';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { ArticleHeader } from './ArticleHeader';

storiesOf('Typescript Component/Article Header', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <ArticleHarness>{storyFn()}</ArticleHarness>
  ))
  .add('Basic Article Header', () => {
    const label = 'Updated Date/Time';
    const defaultValue = new Date();
    const groupId = 'Options';
    const value = date(label, defaultValue, groupId);
    
    const updated = new Date(value).toISOString()
    return (
    <ArticleHeader
      updated={updated}
      breaking={boolean('Breaking', false, groupId)}
      headline="This%20is%20the%20headline"
    />
  )})
