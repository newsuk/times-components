import React from 'react';
import { CardContent, Stack, TextBlock, GridLayout } from 'newskit';
import { StyledImage, StyledCardComposable } from './styles';
import { Puzzles } from './types';
import { NewsKitPuzzlePlaceholder } from './assets';

interface PuzzleCardProps {
  data: Puzzles;
}

export const PuzzleCard = ({ data: { list } }: PuzzleCardProps) => {
  return (
    <GridLayout
      autoFlow="column"
      autoColumns={{
        xs: '126px',
        sm: '206px',
        md: '154px',
        lg: '218px',
        xl: '293px'
      }}
      columnGap="space060"
      alignItems="start"
    >
      {list.map(puzzle => {
        const timestamp = new Date(puzzle.publishedAt);
        const dayOfWeek = timestamp.toLocaleString('en-us', {
          weekday: 'long'
        });
        const imageUrl = puzzle.image!.src;
        return (
          <StyledCardComposable key={puzzle.id} href={puzzle.url}>
            {imageUrl ? (
              <StyledImage src={imageUrl} alt="puzzle" />
            ) : (
              <NewsKitPuzzlePlaceholder />
            )}
            <CardContent justifyItems="center" alignContent="start">
              {puzzle.title && (
                <TextBlock
                  as="div"
                  marginBlockStart="space030"
                  marginBlockEnd="space020"
                  marginInline="space020"
                  stylePreset="inkContrast"
                  typographyPreset={{
                    xs: 'puzzleCardHeader',
                    lg: 'editorialHeadline030'
                  }}
                >
                  {puzzle.title}
                </TextBlock>
              )}
              <Stack
                flow="vertical-center"
                stackDistribution="flex-start"
                height="auto"
              >
                {dayOfWeek && (
                  <div>
                    <TextBlock
                      as="span"
                      paddingBlockStart="space010"
                      paddingBlockEnd="space030"
                      typographyPreset="puzzleCardDay"
                      stylePreset="inkBase"
                    >
                      {dayOfWeek}
                    </TextBlock>
                    <TextBlock
                      as="span"
                      paddingBlockStart="space010"
                      paddingBlockEnd="space030"
                      paddingInlineStart="space010"
                      typographyPreset="puzzleCardText"
                      stylePreset="inkSubtle"
                    >
                      {` | ${puzzle.shortIdentifier}`}
                    </TextBlock>
                  </div>
                )}
              </Stack>
            </CardContent>
          </StyledCardComposable>
        );
      })}
    </GridLayout>
  );
};
