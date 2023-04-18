import React from "react";
import { Container, StyledLabel } from "./styles";
import { Card, Stack, Headline, TextBlock } from "newskit";

interface DateCardItems {
  date: string;
  status?: string;
  gameLevel?: string;
  url: string;
}

interface DateCardProps {
  data: DateCardItems;
  sectionColour?: string;
}

export const DateCard = ({ data, sectionColour }: DateCardProps) => {
  const { date, gameLevel, url } = data;
  const timestamp  = new Date(date);
  const dayOfWeek  = timestamp.toLocaleString("en-us", { weekday: "short" });
  const dateString = timestamp.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Stack
      flow="horizontal-center"
      stackDistribution="flex-start"
      spaceInline="space050"
      height="auto"
    >
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
              <Headline
                headingAs="h2"
                overrides={{
                  paddingBlockEnd: "space000",
                  typographyPreset: "datecardHeader",
                  heading: {
                    stylePreset: "inkBase",
                  },
                }}
              >
                {dayOfWeek}
              </Headline>
            )}
            <TextBlock
              typographyPreset="utilityLabel010"
              stylePreset="inkSubtle"
            >
              {dateString}
            </TextBlock>
          </Stack>
        </Container>
      </Card>
    </Stack>
  );
};
