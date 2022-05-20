import React from 'react';

import { storiesOf } from '@storybook/react';

import { TodaysSectionRail} from './TodaysSectionRail';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { select } from '@storybook/addon-knobs';
import { todaysSection } from './fixtures/fixtures';

storiesOf('Typescript Component/Article Extras', module).add(
  'Todays Article Rail',
  () => {
    const sectionIndex = select(
      'Section',
      todaysSection.reduce(
        (prev, next, index) => ({ ...prev, [next.section]: index }),
        {}
      ),
      4
    );

    return (
      < TodaysSectionRail
        key={sectionIndex}
        analyticsStream={analyticsStream}
        todaysSection={todaysSection[sectionIndex]}
      />
    );
  }
);
