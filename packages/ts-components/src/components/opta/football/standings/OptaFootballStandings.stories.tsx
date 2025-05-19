import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../../../fixtures/article-harness/ArticleHarness';
import { OptaFootballStandings } from './OptaFootballStandings';

const showcase = {
  children: [
    {
      decorator: (storyFn: () => React.ReactNode) => (
        <ArticleHarness>{storyFn()}</ArticleHarness>
      ),
      type: 'decorator'
    },
    {
      component: () => <OptaFootballStandings season="2023" competition="8" />,
      name: 'Standings',
      type: 'story'
    },
    {
      component: () => (
        <OptaFootballStandings season="2024" competition="10" heightSm={1057} />
      ),
      name: 'Standings (with height)',
      type: 'story'
    },
    {
      component: () => (
        <OptaFootballStandings
          season="2023"
          competition="3"
          full_width
          columns
        />
      ),
      name: 'Standings (2 columns - desktop)',
      type: 'story'
    },
    {
      component: () => (
        <OptaFootballStandings
          season="2023"
          competition="3"
          show_title={false}
        />
      ),
      name: 'Standings (inline)',
      type: 'story'
    },
    {
      component: () => (
        <OptaFootballStandings season="2023" competition="3" navigation />
      ),
      name: 'Standings (dropdown)',
      type: 'story'
    },
    {
      component: () => (
        <OptaFootballStandings
          season="2023"
          competition="3"
          default_nav="4"
          navigation
        />
      ),
      name: 'Standings (default)',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Football/Standings'
};

// @ts-ignore
showcaseConverter(module, showcase);
