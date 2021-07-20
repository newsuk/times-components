import React from 'react';
import { storiesOf } from '@storybook/react';

import { OlympicsMedalTable } from './OlympicsMedalTable';
import { HelmetProvider } from 'react-helmet-async';
import { ArticleHarness } from '../../../fixtures/article-harness/ArticleHarness';

storiesOf('Typescript Component/Olympics', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <HelmetProvider context={{}}>
      <ArticleHarness>{storyFn()}</ArticleHarness>
    </HelmetProvider>
  ))

  .add('Medal Table', () => {
    return <OlympicsMedalTable />;
  });
