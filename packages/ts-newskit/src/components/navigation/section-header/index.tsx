import React from 'react';
import { Headline, Visible } from 'newskit';

interface SectionTitleItems {
  title: string;
}

export const SectionHeader = ({ title }: SectionTitleItems) => {
  return (
    <>
      <Visible xs sm>
        <Headline
          headingAs="h1"
          overrides={{
            paddingBlockEnd: 'space030',
            typographyPreset: 'sectionHeader010'
          }}
        >
          {title}
        </Headline>
      </Visible>
      <Visible md lg xl>
        <Headline
          headingAs="h1"
          overrides={{
            marginBlockStart: 'space060',
            marginBlockEnd: 'space010',
            typographyPreset: 'editorialDisplay008'
          }}
        >
          {title}
        </Headline>
      </Visible>
    </>
  );
};
