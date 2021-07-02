import React from 'react';

import { storiesOf } from '@storybook/react';

import { LatestFromSection } from './LatestFromSection';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import { select } from '@storybook/addon-knobs';
import { LatestSection } from './formatters';
import { latestFromSection } from './fixtures/fixtures';

storiesOf('Typescript Component', module).add('Latest from Section', () => {
  const sectionName = select(
    'Section',
    latestFromSection.map((next: LatestSection) => next.section, {}),
    'news'
  );

  return (
    <LatestFromSection
      key={sectionName}
      section={sectionName}
      analyticsStream={analyticsStream}
      latestFromSection={latestFromSection}
    />
  );
});
