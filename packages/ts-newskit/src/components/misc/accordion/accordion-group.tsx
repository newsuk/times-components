import React from 'react';
import {
  Accordion as NewskitAccordion,
  AccordionGroup as NewskitAccordionGroup,
  TextBlock
} from 'newskit';

import { sanitiseCopy } from '../../utils/text-formatting';

type AccordionProps = {
  header: string;
  content: string;
};

type AccordionGroupProps = {
  group: AccordionProps[];
};

export const AccordionGroup = ({ group }: AccordionGroupProps) => {
  const [expandedGroup, toggleExpandedGroup] = React.useState<number[]>([]);

  return (
    <NewskitAccordionGroup
      expanded={expandedGroup}
      onChange={toggleExpandedGroup}
    >
      {group.map(accordion => (
        <NewskitAccordion
          header={accordion.header}
          overrides={{
            header: {
              stylePreset: 'accordionHeaderPrimary',
              typographyPreset: 'utilityHeading010'
            },
            panel: { stylePreset: 'accordionPanelPrimary' }
          }}
        >
          <TextBlock
            typographyPreset="editorialParagraph010"
            stylePreset="neutral070"
            dangerouslySetInnerHTML={{
              __html: sanitiseCopy(accordion.content, {
                br: {},
                b: {},
                i: {},
                a: ['href']
              })
            }}
          />
        </NewskitAccordion>
      ))}
    </NewskitAccordionGroup>
  );
};
