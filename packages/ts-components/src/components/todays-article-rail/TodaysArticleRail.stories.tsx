import React from 'react';

import { storiesOf } from '@storybook/react';

import { TodaysArticleRail} from './TodaysArticleRail';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { select } from '@storybook/addon-knobs';
import { latestFromSection } from './fixtures/fixtures';

storiesOf('Typescript Component/Article Extras', module).add(
  'Todays Article Rail',
  () => {
    const sectionIndex = select(
      'Section',
      latestFromSection.reduce(
        (prev, next, index) => ({ ...prev, [next.section]: index }),
        {}
      ),
      4
    );

    return (
      <TodaysArticleRail
        key={sectionIndex}
        analyticsStream={analyticsStream}
        latestFromSection={latestFromSection[sectionIndex]}
      />
    );
  }
);
