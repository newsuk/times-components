import React from 'react';
import { storiesOf } from '@storybook/react';

import { OlympicsMedalTable } from './OlympicsMedalTable';
import { HelmetProvider } from 'react-helmet-async';
import { ArticleHarness } from '../../../fixtures/article-harness/ArticleHarness';
import { text } from '@storybook/addon-knobs';

storiesOf('Typescript Component/Olympics', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <HelmetProvider context={{}}>
      <ArticleHarness>{storyFn()}</ArticleHarness>
    </HelmetProvider>
  ))

  .add('Medal Table', () => {
    const authToken = text('Auth Token', '6i3DuEwbVhr2Fht6');
    const gamesCode = text('Games Code', 'OG2020-TR2');

    return <OlympicsMedalTable authToken={authToken} gamesCode={gamesCode} />;
  });
