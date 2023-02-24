import React from 'react';
import { Headline } from 'newskit';

export const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Headline
      headingAs="h1"
      overrides={{
        typographyPreset: 'sectionHeader010',
        heading: {
          stylePreset: 'sectionheaderText'
        }
      }}
    >
      {title}
    </Headline>
  );
};
