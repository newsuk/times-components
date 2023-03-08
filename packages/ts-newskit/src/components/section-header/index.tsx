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
        paddingBlockEnd: 'space030',
        typographyPreset: 'sectionHeader010'
      }}
    >
      {title}
    </Headline>
  );
};
