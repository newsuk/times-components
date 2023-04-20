import React from 'react';
import {
  Accordion,
  GridLayout,
  Scroll,
  getSSRId,
  Stack,
  toNewsKitIcon,
  TextBlock
} from 'newskit';
import { CardContainer, SeeMoreBox, StyledAccordionGroup } from './styles';
import { East } from '@emotion-icons/material';
import { Puzzles } from './types';

interface ArchiveProps {
  data: Puzzles;
}

const IconEast = toNewsKitIcon(East);

export const Archive = ({ data }: ArchiveProps) => {
  const [expandedMultiple, setExpandedMultiple] = React.useState([0]);
  const puzzleTitleSet = new Set<string>();
  data.list.forEach(puzzle => puzzleTitleSet.add(puzzle.title));
  const puzzleTitles: string[] = Array.from(puzzleTitleSet);

  return (
    <StyledAccordionGroup
      expanded={expandedMultiple}
      onChange={setExpandedMultiple}
    >
      {puzzleTitles.map(title => (
        <Accordion
          header={title.toLocaleUpperCase()}
          id={getSSRId()}
          overrides={{
            header: {
              typographyPreset: 'utilityButton010',
              paddingInline: 'space000'
            },
            panel: {
              paddingInline: 'space000',
              paddingBlockStart: 'space000',
              paddingBlockEnd: 'space050'
            }
          }}
        >
          <Scroll overrides={{ overlays: { stylePreset: '__delete' } }}>
            <GridLayout
              autoFlow="column"
              autoColumns={{ xs: '110px', lg: '111.25px', xl: '148.75px' }}
              columnGap="space030"
            >
              {data.list.filter(puzzle => puzzle.title === title).map(() => (
                <CardContainer id={getSSRId()} />
              ))}
              <SeeMoreBox>
                <Stack flow="vertical-center" stackDistribution="center">
                  <IconEast
                    overrides={{
                      size: 'iconSize030',
                      stylePreset: 'inkBase'
                    }}
                  />
                  <TextBlock
                    typographyPreset="utilityButton020"
                    stylePreset="inkContrast"
                    marginBlockStart="space030"
                  >
                    See more
                  </TextBlock>
                </Stack>
              </SeeMoreBox>
            </GridLayout>
          </Scroll>
        </Accordion>
      ))}
    </StyledAccordionGroup>
  );
};
