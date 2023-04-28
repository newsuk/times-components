import React from 'react';
import { CardContent, Stack, TextBlock, Block } from 'newskit';
import { StyledImage, StyledCard, Wrap } from './styles';
import { PuzzleCardItem } from './types';
import { NewsKitPuzzlePlaceholder } from './assets';
import { PuzzlesFlag } from '../flag';

interface PuzzleCardProps {
  data: PuzzleCardItem;
}

export const PuzzleCard = ({ data }: PuzzleCardProps) => {
  if (!data) {
    return null;
  }
  const timestamp = new Date(data.publishedAt);
  const dayOfWeek = timestamp.toLocaleString('en-us', { weekday: 'long' });
  const imageUrl = data.image && data.image.src ? data.image.src : '';

  return (
    <StyledCard key={data.id} href={data.url}>
      <Block style={{ position: 'relative' }}>
        {imageUrl ? (
          <StyledImage src={imageUrl} alt="puzzle" />
        ) : (
          <NewsKitPuzzlePlaceholder />
        )}
        {data.status && (
          <Wrap>
            <PuzzlesFlag status={data.status} />
          </Wrap>
        )}
      </Block>
      <CardContent justifyItems="center">
        {data.title && (
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
            {data.title}
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
            {data.shortIdentifier && (
              <TextBlock
                as="span"
                paddingBlockStart="space010"
                paddingBlockEnd="space030"
                paddingInlineStart="space010"
                typographyPreset="utilityBody010"
                stylePreset="inkSubtle"
              >
                {` | ${data.shortIdentifier}`}
              </TextBlock>
            )}
          </Block>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};
