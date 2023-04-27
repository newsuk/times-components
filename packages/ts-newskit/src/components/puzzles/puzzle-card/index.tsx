import React from 'react';
import { CardContent, Stack, TextBlock, Block } from 'newskit';
import { StyledImage, StyledCard, Wrap } from './styles';
import { Puzzles } from './types';
import { NewsKitPuzzlePlaceholder } from './assets';
import { PuzzlesFlag } from '../flag';

interface PuzzleCardProps {
  data: Puzzles;
}

export const PuzzleCard = ({ data: { list } }: PuzzleCardProps) => {
  const puzzle = list[0];
  if (!puzzle) {
    return null;
  }
  const timestamp = new Date(puzzle.publishedAt);
  const dayOfWeek = timestamp.toLocaleString('en-us', { weekday: 'long' });
  const imageUrl = puzzle.image!.src;

  return (
    <StyledCard key={puzzle.id} href={puzzle.url}>
      <Block style={{ position: 'relative' }}>
        {imageUrl ? (
          <StyledImage src={imageUrl} alt="puzzle" />
        ) : (
          <NewsKitPuzzlePlaceholder />
        )}
        {puzzle.status && (
          <Wrap>
            <PuzzlesFlag status={puzzle.status} />
          </Wrap>
        )}
      </Block>
      <CardContent justifyItems="center">
        {puzzle.title && (
          <TextBlock
            as="div"
            marginBlock="space020"
            marginInline="space020"
            stylePreset="inkContrast"
            typographyPreset={{
              xs: 'editorialHeadline010',
              lg: 'editorialHeadline020'
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
          <Block>
            {dayOfWeek && (
              <TextBlock
                as="span"
                paddingBlockStart="space010"
                paddingBlockEnd="space030"
                typographyPreset="utilityLabel010"
                stylePreset="inkBase"
              >
                {dayOfWeek}
              </TextBlock>
            )}
            {puzzle.shortIdentifier && (
              <TextBlock
                as="span"
                paddingBlockStart="space010"
                paddingBlockEnd="space030"
                paddingInlineStart="space010"
                typographyPreset="utilityBody010"
                stylePreset="inkSubtle"
              >
                {` | ${puzzle.shortIdentifier}`}
              </TextBlock>
            )}
          </Block>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};
