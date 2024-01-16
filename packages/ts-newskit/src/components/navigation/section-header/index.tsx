import React, { ReactNode } from 'react';
import { Headline } from 'newskit';

interface SectionTitleItems {
  children: ReactNode;
}

export const SectionHeader = ({ children }: SectionTitleItems) => {
  return (
    <Headline
      headingAs="h1"
      overrides={{
        marginBlockStart: { md: 'space070' },
        marginBlockEnd: { xs: 'space030', md: 'space045' },
        typographyPreset: {
          xs: 'sectionHeader010',
          md: 'editorialDisplay008'
        }
      }}
    >
      {children}
    </Headline>
  );
};
