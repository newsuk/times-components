import React from 'react';
import { storiesOf } from '@storybook/react';

import { OlympicsMedalTable } from './OlympicsMedalTable';
import { ArticleHarness } from '../../../fixtures/article-harness/ArticleHarness';
import { boolean, text } from '@storybook/addon-knobs';
import { config } from '../OlympicsKeys';

storiesOf('Typescript Component/Olympics', module).add('Medal Table', () => {
  const inArticle = boolean('Is In Article', true);
  const highlighted = text('Highlighted Country', 'GBR');

  return (
    <ArticleHarness>
      <OlympicsMedalTable
        keys={config.prod}
        highlighted={highlighted}
        inArticle={inArticle}
      />
    </ArticleHarness>
  );
});
