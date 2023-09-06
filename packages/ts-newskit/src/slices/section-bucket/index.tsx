import React, { useState, useEffect } from 'react';
import { ArticleProps } from '../../components/slices/article';
import { ArticleStack } from './article-stacks';
import {
  SliceHeader,
  SliceHeaderProps
} from '../../components/slices/slice-header';
import { Divider, useBreakpointKey, Scroll, BreakpointKeys } from 'newskit';
import { CustomGridLayout } from '../shared/layouts';
import { StyledBlock } from './styles';
import { BlockItem } from '../shared-styles';
import { ClickHandlerType } from '../types';

export interface SectionBucketProps {
  articleStackOne: ArticleStackProps;
  articleStackTwo: ArticleStackProps;
  articleStackThree: ArticleStackProps;
  articleStackFour: ArticleStackProps;
  clickHandler: ClickHandlerType;
}

type ArticleStackProps = {
  articles: ArticleProps[];
  section: SliceHeaderProps;
  clickHandler: ClickHandlerType;
};

const ArticleStackBlock = ({
  articles,
  section,
  clickHandler
}: ArticleStackProps) => (
  <>
    <StyledBlock data-testid="article-block">
      <SliceHeader
        {...section}
        titleTypographyPreset="editorialDisplay003"
        iconArrowSize="iconSize010"
        iconSize="small"
        padding="space040"
      />
      <ArticleStack articles={articles} clickHandler={clickHandler} />
    </StyledBlock>
    <Divider overrides={{ stylePreset: 'lightDivider' }} vertical />
  </>
);

export const SectionBucket = ({
  articleStackOne,
  articleStackTwo,
  articleStackThree,
  articleStackFour,
  clickHandler
}: SectionBucketProps) => {
  const [currentBreakpoint, setBreakpoint] = useState<BreakpointKeys | null>(
    null
  );
  const breakpointKey = useBreakpointKey();
  useEffect(
    () => {
      setBreakpoint(breakpointKey);
    },
    [breakpointKey]
  );

  if (!currentBreakpoint) {
    return null;
  }

  const isMobile = currentBreakpoint === 'xs' || currentBreakpoint === 'sm';

  const articleStacksArray = [
    articleStackOne,
    articleStackTwo,
    articleStackThree,
    articleStackFour
  ];

  const ArticleStackBlocks = (
    <CustomGridLayout>
      {articleStacksArray.map((stack, index) => (
        <ArticleStackBlock key={index} {...stack} clickHandler={clickHandler} />
      ))}
    </CustomGridLayout>
  );

  return isMobile ? (
    <Scroll
      overrides={{
        overlays: { stylePreset: 'transparentBackground' },
        marginBlockEnd: 'space060'
      }}
      tabIndex={undefined}
    >
      {ArticleStackBlocks}
    </Scroll>
  ) : (
    <BlockItem
      $width={{
        xs: '100%',
        md: '720px',
        lg: '976px',
        xl: '1276px'
      }}
      marginBlockEnd="sizing060"
    >
      {ArticleStackBlocks}
    </BlockItem>
  );
};
