import React from 'react';

import { storiesOf } from '@storybook/react';

import { LatestFromSection } from './LatestFromSection';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { select } from '@storybook/addon-knobs';
import { latestFromSection } from './fixtures/fixtures';

storiesOf('Typescript Component/Article Extras', module).add(
  'Latest from Section',
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
      <LatestFromSection
        key={sectionIndex}
        analyticsStream={analyticsStream}
        latestFromSection={latestFromSection[sectionIndex]}
      />
    );
  }
);
