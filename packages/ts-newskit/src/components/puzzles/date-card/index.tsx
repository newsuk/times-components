import React from 'react';
import { Container, StyledLabel } from './styles';
import { Card, Stack, TextBlock } from 'newskit';
import { DateCardItems } from './types';

interface DateCardProps {
  data: DateCardItems;
  sectionColour?: string;
}

export const DateCard = ({ data, sectionColour }: DateCardProps) => {
  const { date, gameLevel, url } = data;
  const timestamp = new Date(date);
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
        </Stack>
      </Container>
    </Card>
  );
};
