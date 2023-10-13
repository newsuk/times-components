import React from 'react';
import { ArticleProps } from '../../components/slices/article';
import { ArticleStack } from './article-stacks';
import { SliceHeader } from '../../components/slices/slice-header';
import { Divider, Scroll, FlagSize, Visible } from 'newskit';
import { CustomGridLayout } from '../shared/layouts';
import { StyledBlock } from './styles';
import { BlockItem } from '../shared-styles';
import { ClickHandlerType } from '../types';

export interface SectionBucketProps {
  articleStackOne: ArticleStackBlockProps;
  articleStackTwo: ArticleStackBlockProps;
  articleStackThree: ArticleStackBlockProps;
  articleStackFour: ArticleStackBlockProps;
  clickHandler: ClickHandlerType;
  sliceHeaderClickHandler: (title: string) => void;
}

type SectionBucketSliceHeaderProps = {
  title: string;
  href?: string;
  titleTypographyPreset?: string;
  iconArrowSize?: string;
  iconSize?: FlagSize;
  padding?: string;
};

type ArticleStackBlockProps = {
  articles: ArticleProps[];
  section: SectionBucketSliceHeaderProps;
  clickHandler: ClickHandlerType;
  sliceHeaderClickHandler: (title: string) => void;
};

const ArticleStackBlock = ({
  articles,
  section,
  clickHandler,
  sliceHeaderClickHandler
}: ArticleStackBlockProps) => (
  <>
    <StyledBlock data-testid="article-block">
      <SliceHeader
        {...section}
        titleTypographyPreset="editorialDisplay003"
        iconArrowSize="iconSize010"
        iconSize="small"
        padding="space040"
        sliceHeaderClickHandler={sliceHeaderClickHandler}
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
  clickHandler,
  sliceHeaderClickHandler
}: SectionBucketProps) => {
  const articleStacksArray = [
    articleStackOne,
    articleStackTwo,
    articleStackThree,
    articleStackFour
  ];

  const ArticleStackBlocks = (
    <CustomGridLayout>
      {articleStacksArray.map((stack, index) => (
        <ArticleStackBlock
          key={index}
          {...stack}
          clickHandler={clickHandler}
          sliceHeaderClickHandler={sliceHeaderClickHandler}
        />
      ))}
    </CustomGridLayout>
  );

  return (
    <>
      <Visible xs sm>
        <Scroll
          overrides={{
            overlays: { stylePreset: 'transparentBackground' },
            marginBlockEnd: 'space060'
          }}
          tabIndex={undefined}
        >
          {ArticleStackBlocks}
        </Scroll>
      </Visible>
      <Visible md lg xl>
        <BlockItem
          $width={{
            xs: '100%',
            md: '720px',
            lg: '976px',
            xl: '1276px'
          }}
          marginBlockEnd="space060"
        >
          {ArticleStackBlocks}
        </BlockItem>
      </Visible>
    </>
  );
};
