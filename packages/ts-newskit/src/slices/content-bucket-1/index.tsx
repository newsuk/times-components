import { Cell, Divider, Grid, GridLayout, Stack } from 'newskit'
import React from 'react'
import { JournalistQuote } from '../../components/slices/journalist-quote'
import { LeadStory } from '../../components/slices/lead-story'
import { SliceHeader } from '../../components/slices/slice-header'

type SectionProps = {
  title: string;
  color: string;
}
type Journalist = {
  name: string;
  image?: string;
};
type LeadStoryProps = {
  headline: string;
  color: string;
  readingTime: string;
  summary: string;
  bylines: string;
  subHeadline?: string;
  caption: string;
  image: string;
  url: string;
}
type JournalistProps = {
  journalist: Journalist;
  heading?: string;
  quote: string;
  sectionColour: string;
  textColour?: string;
}

interface ContentBucket1Props {
  section: SectionProps;
  leadStory: LeadStoryProps;
  journalists: JournalistProps[]
}

export const ContentBucket1 = ({ section, leadStory, journalists }: ContentBucket1Props) => {
  return (
    <Grid>
      <Cell xs="full-width">
        <SliceHeader {...section} />
      </Cell>
      <Cell xs="full-width" lg={8}>
        <LeadStory {...leadStory} />
      </Cell>
      <Cell xs="full-width" lg={4} xsOrder={1} mdOrder={0}>
        <LeadStory {...leadStory} />
      </Cell>
      <Cell xs="full-width" lg={8}>
        <Divider overrides={{ marginBlock:"space040", stylePreset: "dashedDivider" }} />
        <Stack flow={{xs:"vertical-left", md:"horizontal-center"}} stackDistribution="space-evenly">
          {journalists.map((journalist, journalistIndex, journalistArr) => {
            const hasBorder = journalistIndex < journalistArr.length - 1 && <Divider overrides={{ marginInline:{md:"space040"}, marginBlock:"space040", stylePreset: "lightDivider" }} vertical={{xs: false, md: true}} />;

            return (
              <React.Fragment key={journalist.journalist.name}>
                <JournalistQuote {...journalist} />
                {hasBorder}
              </React.Fragment>
            )
          })}
        </Stack>
      </Cell>
    </Grid>
  )
}
