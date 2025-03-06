import React from 'react';
import { storiesOf } from '@storybook/react';

import { OlympicsSchedule } from './OlympicsSchedule';
import { ArticleHarness } from '../../../fixtures/article-harness/ArticleHarness';
import { boolean } from '@storybook/addon-knobs';
import { config } from '../OlympicsKeys';

storiesOf('Typescript Component/Olympics', module).add('Schedule', () => {
  const inArticle = boolean('Is In Article', true);
  return (
    <ArticleHarness>
      <OlympicsSchedule keys={config.prod} inArticle={inArticle} />
    </ArticleHarness>
  );
});
