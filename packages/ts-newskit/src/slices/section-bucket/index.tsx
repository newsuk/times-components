import React from 'react';
import { ArticleProps } from '../../components/slices/article';
import { ArticleStack } from './article-stacks';
import {
  SliceHeader,
  SliceHeaderProps
} from '../../components/slices/slice-header';
import { Divider, useBreakpointKey, Scroll } from 'newskit';
import { CustomGridLayout } from '../shared/layouts';
import { StyledBlock } from './styles';

export interface SectionBucketProps {
  articleStackOne: ArticleStackProps;
  articleStackTwo: ArticleStackProps;
  articleStackThree: ArticleStackProps;
  articleStackFour: ArticleStackProps;
}

type ArticleStackProps = {
  articles: ArticleProps[];
  section: SliceHeaderProps;
};

const ArticleStackBlock = ({ articles, section }: ArticleStackProps) => (
  <>
    <StyledBlock data-testid="article-block">
      <SliceHeader
        {...section}
        titleTypographyPreset="editorialDisplay003"
        iconArrowSize="iconSize010"
        iconSize="small"
        padding="space040"
      />
      <ArticleStack articles={articles} />
    </StyledBlock>
    <Divider overrides={{ stylePreset: 'lightDivider' }} vertical />
  </>
);

export const SectionBucket = ({
  articleStackOne,
  articleStackTwo,
  articleStackThree,
  articleStackFour
}: SectionBucketProps) => {
  const breakpoint = useBreakpointKey();
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';

  const articleStacksArray = [
    articleStackOne,
    articleStackTwo,
    articleStackThree,
    articleStackFour
  ];

  const ArticleStackBlocks = (
    <CustomGridLayout>
      {articleStacksArray.map((stack, index) => (
        <ArticleStackBlock key={index} {...stack} />
      ))}
    </CustomGridLayout>
  );

  return isMobile ? (
    <Scroll
      overrides={{ overlays: { stylePreset: 'transparentBackground' } }}
      tabIndex={undefined}
    >
      {ArticleStackBlocks}
    </Scroll>
  ) : (
    ArticleStackBlocks
  );
};
