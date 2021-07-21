import React from 'react';
import { storiesOf } from '@storybook/react';

import { OlympicsSchedule } from './OlympicsSchedule';
import { HelmetProvider } from 'react-helmet-async';
import { ArticleHarness } from '../../../fixtures/article-harness/ArticleHarness';
import { text, select } from '@storybook/addon-knobs';

storiesOf('Typescript Component/Olympics', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <HelmetProvider context={{}}>
      <ArticleHarness>{storyFn()}</ArticleHarness>
    </HelmetProvider>
  ))

  .add('Schedule', () => {
    const endpoint = select(
      'Endpoint',
      {
        staging: 'https://olympics-embed-staging.pamedia.io',
        prod: 'https://olympics-embed.pamedia.io'
      },
      'https://olympics-embed-staging.pamedia.io'
    );
    const authToken = text('Auth Token', '6i3DuEwbVhr2Fht6');
    const gamesCode = text('Games Code', 'OG2020-TR2');

    return <OlympicsSchedule keys={{ endpoint, authToken, gamesCode }} />;
  });
