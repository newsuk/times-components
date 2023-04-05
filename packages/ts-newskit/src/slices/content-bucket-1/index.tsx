import { Block, Cell, Divider, Grid, GridLayout, Hidden, Scroll, Stack, useBreakpointKey, Visible } from 'newskit'
import React from 'react'
import { JournalistQuote } from '../../components/slices/journalist-quote'
import { LeadStory } from '../../components/slices/lead-story'
import { SliceHeader } from '../../components/slices/slice-header'
import { ArticleListItem, ArticleListItemProps } from '../../components/slices/articleList'
import { JournalistDivider, LeadStoryDivider, LeadStoryCell, CellNoMargin } from './styles'

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
  journalists: JournalistProps[];
  articles: ArticleListItemProps[];
}

export const ContentBucket1 = ({ section, leadStory, journalists, articles }: ContentBucket1Props) => {
  const breakpointKey = useBreakpointKey();
  return (
    <Grid xsMargin="space040" mdMargin="space050">
      <Cell xs={12}>
        <SliceHeader {...section} />
      </Cell>
      <LeadStoryCell xs={12} lg={10} xl={8}>
        <Block>
          <Visible lg xl>
            <LeadStoryDivider overrides={{ stylePreset: "lightDivider" }} vertical />
          </Visible>
          <LeadStory {...leadStory} />
        </Block>
        <Block marginInlineEnd={{xs:"space000",lg:"space040"}}>
          <Hidden md>
            <Divider overrides={{ marginBlock:"space040", stylePreset: "dashedDivider" }} />
            <Stack flow={{xs:"vertical-left", md:"horizontal-center"}} stackDistribution="space-evenly">
              {journalists.map((journalist, journalistIndex, journalistArr) => {
                const hasBorder = journalistIndex < journalistArr.length - 1 && <JournalistDivider overrides={{ marginInline:{md:"space040"}, marginBlock:{xs:"space040",md:"space000"}, stylePreset: "lightDivider" }} vertical={{xs: false, md: true}} />;

                return (
                  <React.Fragment key={journalist.journalist.name}>
                    <JournalistQuote {...journalist} />
                    {hasBorder}
                  </React.Fragment>
                )
              })}
            </Stack>
          </Hidden>
        </Block>
      </LeadStoryCell>
      <CellNoMargin xs={12} lg={2} xl={4}>
        <Hidden lg xl>
          <Divider overrides={{ marginBlock:"space040", stylePreset: "dashedDivider" }} />
        </Hidden>
        <Scroll overrides={{ overlays: { stylePreset: 'menuScrollOverlay' } }}>
          <GridLayout columns={{ xs:"170px 1px 170px 1px 170px 1px 170px", md:"1fr 1px 1fr 1px 1fr 1px 1fr", lg:"1fr", xl:"1fr 1px 1fr" }} columnGap="space040">
            {articles.map((article: ArticleListItemProps, articleIndex) => {
              const articleBorder = breakpointKey === 'xl' && articleIndex % 2 !== 0
                ? null
                : <Divider overrides={{ stylePreset: "lightDivider" }} vertical />

              const articleTopBorder = (breakpointKey === 'xl' && articleIndex > 1) || (breakpointKey === 'lg' && articleIndex > 0)

              return (
                <React.Fragment key={article.title}>
                  <ArticleListItem {...article} hasTopBorder={articleTopBorder} />
                  {articleBorder}
                </React.Fragment>
              )
            })}
          </GridLayout>
        </Scroll>
      </CellNoMargin>
      <Visible md>
        <CellNoMargin xs={12} lg={8}>
          <Divider overrides={{ marginBlock:"space040", stylePreset: "dashedDivider" }} />
          <Stack flow={{xs:"vertical-left", md:"horizontal-center"}} stackDistribution="space-evenly">
            {journalists.map((journalist, journalistIndex, journalistArr) => {
              const hasBorder = journalistIndex < journalistArr.length - 1 && <JournalistDivider overrides={{ marginInline:{md:"space040"}, marginBlock:{xs:"space040",md:"space000"}, stylePreset: "lightDivider" }} vertical={{xs: false, md: true}} />;

              return (
                <React.Fragment key={journalist.journalist.name}>
                  <JournalistQuote {...journalist} />
                  {hasBorder}
                </React.Fragment>
              )
            })}
          </Stack>
        </CellNoMargin>
      </Visible>
    </Grid>
  )
}
