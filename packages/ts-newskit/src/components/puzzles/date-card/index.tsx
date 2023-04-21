import React from 'react';
import { Container, StyledLabel } from './styles';
import { Block, Card, Stack, TextBlock } from 'newskit';
import { DateCardItems } from './types';
import { PuzzlesFlag } from '../flag';

interface DateCardProps {
  data: DateCardItems;
  sectionColour?: string;
}

export const DateCard = ({ data, sectionColour }: DateCardProps) => {
  const { publishedAt, gameLevel, url, status } = data;
  const timestamp = new Date(publishedAt);
  const dayOfWeek = timestamp.toLocaleString('en-us', { weekday: 'short' });
  const dateString = timestamp.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card href={url}>
      <Container>
        <StyledLabel
          size="small"
          sectionColour={sectionColour}
          hasGameLevel={!!gameLevel}
        >
          {gameLevel && gameLevel}
        </StyledLabel>
        <Stack
          flow="vertical-center"
          stackDistribution="flex-start"
          height="auto"
        >
          {dayOfWeek && (
            <TextBlock
              as="div"
              paddingBlock="space020"
              typographyPreset="dateCardHeader"
              stylePreset="inkBase"
            >
              {dayOfWeek}
            </TextBlock>
          )}
          <TextBlock
            paddingBlock="space010"
            typographyPreset="utilityLabel010"
            stylePreset="inkSubtle"
          >
            {dateString}
          </TextBlock>
          {status && (
            <Block marginBlockStart="space030">
              <PuzzlesFlag status={status} />
            </Block>
          )}
        </Stack>
      </Container>
    </Card>
  );
};
