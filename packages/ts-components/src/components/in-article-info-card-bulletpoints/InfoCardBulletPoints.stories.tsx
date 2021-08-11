import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { InfoCardBulletPoints } from './InfoCardBulletPoints';

storiesOf('Typescript Component/In Article/Info Card', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <ArticleHarness>{storyFn()}</ArticleHarness>
  ))

  .add('Bullet Points', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43978">
      <InfoCardBulletPoints sectionColour="#636C17" />
    </FetchProvider>
  ));
