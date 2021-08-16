import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { BigNumbers } from './BigNumbers';

storiesOf('Typescript Component/In Article/Big Numbers', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <ArticleHarness>{storyFn()}</ArticleHarness>
  ))

  .add('Big Numbers', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43978">
      <BigNumbers sectionColour="#636C17" />
    </FetchProvider>
  ));
