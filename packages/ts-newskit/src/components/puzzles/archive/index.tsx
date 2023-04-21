import React from 'react';
import {
  Accordion,
  GridLayout,
  Scroll,
  getSSRId,
  Stack,
  TextBlock,
  Card
} from 'newskit';
import { CardContainer, SeeMoreBox, StyledAccordionGroup } from './styles';
import { Puzzles } from './types';
import { DateCard } from '../date-card';
import { NewskitIconEast } from '../../../assets';

interface ArchiveProps {
  data: Puzzles;
  seeMoreLink?: string;
}

export const Archive = ({ data, seeMoreLink }: ArchiveProps) => {
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
          <Scroll
            overrides={{ overlays: { stylePreset: '__delete' } }}
            controls="hover"
          >
            <GridLayout
              autoFlow="column"
              autoColumns={{ xs: '110px', lg: '111.25px', xl: '148.75px' }}
              columnGap="space030"
            >
              {data.list.filter(puzzle => puzzle.title === title).map(item => (
                <CardContainer id={getSSRId()}>
                  <DateCard
                    data={{
                      publishedAt: item.publishedAt,
                      url: item.url,
                      status: item.status,
                      gameLevel: item.gameLevel
                    }}
                  />
                </CardContainer>
              ))}
              <Card href={seeMoreLink}>
                <SeeMoreBox>
                  <Stack flow="vertical-center" stackDistribution="center">
                    <NewskitIconEast
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
              </Card>
            </GridLayout>
          </Scroll>
        </Accordion>
      ))}
    </StyledAccordionGroup>
  );
};
