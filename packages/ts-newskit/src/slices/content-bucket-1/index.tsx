import { Cell, Grid, Stack } from 'newskit'
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
      <Cell xs="full-width" lg={8}>
        <Stack flow={{xs:"vertical-center", md:"horizontal-center"}} stackDistribution="center">
          {journalists.map(journalist => <JournalistQuote key={journalist.journalist.name} {...journalist} />)}
        </Stack>
      </Cell>
    </Grid>
  )
}
