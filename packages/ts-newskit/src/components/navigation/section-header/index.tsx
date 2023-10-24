import React from 'react';
import { Headline } from 'newskit';

interface SectionTitleItems {
  title: string;
}

export const SectionHeader = ({ title }: SectionTitleItems) => {
  return (
    <Headline
      headingAs="h1"
      overrides={{
        marginBlockStart: { xs: '', md: 'space060' },
        marginBlockEnd: 'space010',
        typographyPreset: {
          xs: 'sectionHeader010',
          md: 'editorialDisplay008'
        }
      }}
    >
      {title}
    </Headline>
  );
};
