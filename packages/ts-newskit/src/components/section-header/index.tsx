import React from 'react';
import { Headline } from 'newskit';

interface SectionTitleItems {
  title: string;
};

export const SectionHeader = ({ title }: SectionTitleItems) => {
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
