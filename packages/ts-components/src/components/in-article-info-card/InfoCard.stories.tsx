import React from 'react';
import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { InfoCard } from './InfoCard';
import { storiesOf } from '@storybook/react';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';

storiesOf('Typescript Component/In Article/Info Card', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <ArticleHarness>{storyFn()}</ArticleHarness>
  ))

  .add('Standard with Copy & Subtitle', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43606">
      <InfoCard sectionColour="#636C17" />
    </FetchProvider>
  ))

  .add('Wide with Copy', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43603">
      <InfoCard sectionColour="#636C17" />
    </FetchProvider>
  ))

  .add('Wide with Image', () => (
    <FetchProvider url="https://gobble.timesdev.tools/deck/api/deck-post-action/43614">
      <InfoCard sectionColour="#636C17" />
    </FetchProvider>
  ));
