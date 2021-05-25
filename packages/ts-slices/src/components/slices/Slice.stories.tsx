import React from 'react';
import { showcaseConverter } from '@times-components/storybook';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness';
import { getSlice } from '../../fixtures/getSlice';

import { Slice } from './Slice';

const onClick = (event: React.MouseEvent) => {
  event.preventDefault();
};

const showcase = {
  children: [
    {
      decorator: (storyFn: () => React.ReactNode) => (
        <ArticleHarness>{storyFn()}</ArticleHarness>
      ),
      type: 'decorator'
    },
    {
      component: () => (
        <Slice slice={getSlice('LEAD_1')} clickHandler={onClick} />
      ),
      name: 'LEAD_1',
      type: 'story'
    },
    {
      component: () => (
        <Slice slice={getSlice('LEAD_1_AND_1')} clickHandler={onClick} />
      ),
      name: 'LEAD_1_AND_1',
      type: 'story'
    },
    {
      component: () => (
        <Slice slice={getSlice('LEAD_1_AND_2')} clickHandler={onClick} />
      ),
      name: 'LEAD_1_AND_2',
      type: 'story'
    },
    {
      component: () => (
        <Slice
          slice={getSlice('LEAD_1_AND_2_COLUMNIST')}
          clickHandler={onClick}
        />
      ),
      name: 'LEAD_1_AND_2_COLUMNIST',
      type: 'story'
    },
    {
      component: () => (
        <Slice
          slice={getSlice('LEAD_1_AND_3_REVERSED')}
          clickHandler={onClick}
        />
      ),
      name: 'LEAD_1_AND_3_REVERSED',
      type: 'story'
    },
    {
      component: () => (
        <Slice slice={getSlice('LEAD_2')} clickHandler={onClick} />
      ),
      name: 'LEAD_2',
      type: 'story'
    },
    {
      component: () => (
        <Slice slice={getSlice('SECONDARY_2_AND_2')} clickHandler={onClick} />
      ),
      name: 'SECONDARY_2_AND_2',
      type: 'story'
    },
    {
      component: () => (
        <Slice slice={getSlice('SECONDARY_2_AND_3')} clickHandler={onClick} />
      ),
      name: 'SECONDARY_2_AND_3',
      type: 'story'
    },
    {
      component: () => (
        <Slice
          slice={getSlice('SECONDARY_2_AND_3_NO_PIC')}
          clickHandler={onClick}
        />
      ),
      name: 'SECONDARY_2_AND_3_NO_PIC',
      type: 'story'
    },
    {
      component: () => (
        <Slice slice={getSlice('SECONDARY_3')} clickHandler={onClick} />
      ),
      name: 'SECONDARY_3',
      type: 'story'
    },
    {
      component: () => (
        <Slice slice={getSlice('SECONDARY_4')} clickHandler={onClick} />
      ),
      name: 'SECONDARY_4',
      type: 'story'
    },
    {
      component: () => (
        <Slice slice={getSlice('SECONDARY_4_ODD')} clickHandler={onClick} />
      ),
      name: 'SECONDARY_4_ODD',
      type: 'story'
    },
    {
      component: () => (
        <Slice
          slice={getSlice('SECONDARY_4_ODD_COLUMNIST')}
          clickHandler={onClick}
        />
      ),
      name: 'SECONDARY_4_ODD_COLUMNIST',
      type: 'story'
    },
    {
      component: () => (
        <Slice slice={getSlice('SECONDARY_10')} clickHandler={onClick} />
      ),
      name: 'SECONDARY_10',
      type: 'story'
    }
  ],
  name: 'Typescript Slices/Slices'
};

// @ts-ignore
showcaseConverter(module, showcase);
