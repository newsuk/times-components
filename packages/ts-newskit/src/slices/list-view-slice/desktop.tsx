import React, { Fragment } from 'react';
import { Divider, Block, Stack } from 'newskit';
import { ArticleStack } from './article-stack';
import { StyledMainDivider, StyledAdContainer, StyledDateText } from './styles';
import { convertDateToMonth } from '../../utils/date-formatting';
import { groupArticlesByDate } from './utils';
import { Paginations } from './pagination';
import { ListViewSliceProps } from '.';

export const ListViewSliceDesktop = ({
  leadArticles,
  clickHandler,
  currentPage = 1,
  handlePageChange,
  itemsPerPage = 10,
  totalItems,
  isLoading,
  StickyAd,
  SectionAd
}: ListViewSliceProps) => {
  const modifiedLeadArticles = leadArticles
    .slice((currentPage - 1) * itemsPerPage, itemsPerPage * currentPage)
    .map(item => ({
      ...item,
      headlineTypographyPreset: 'editorialHeadline020',
      isLeadImage: false
    }));

  const arrayOfArrays = Object.values(
    groupArticlesByDate(modifiedLeadArticles)
  );

  const articleWithAdSlot = arrayOfArrays.flat()[
    Math.ceil(arrayOfArrays.length / 2)
  ];

  return (
    <>
      <Stack flow="horizontal-top">
        <Block>
          {arrayOfArrays.map((arrayOfArray, index) => {
            return (
              <Fragment key={arrayOfArray[0].id}>
                <StyledMainDivider>
                  {index > 0 && (
                    <Block marginBlock="space040">
                      <Divider
                        overrides={{
                          stylePreset: 'dashedDivider'
                        }}
                      />
                    </Block>
                  )}
                  <Stack flow="horizontal-top">
                    <Block marginInlineEnd={{ md: 'space060', xl: 'space080' }}>
                      <StyledDateText
                        typographyPreset="utilityLabel005"
                        stylePreset="inkNonEssential"
                        as="span"
                      >
                        {arrayOfArray[0].datePublished &&
                          convertDateToMonth(arrayOfArray[0].datePublished)}
                      </StyledDateText>
                    </Block>
                    <Block>
                      <ArticleStack
                        leadArticles={arrayOfArray}
                        SectionAd={SectionAd}
                        clickHandler={clickHandler}
                        articleWithAdSlot={articleWithAdSlot}
                      />
                    </Block>
                  </Stack>
                </StyledMainDivider>
              </Fragment>
            );
          })}
        </Block>
        <StyledAdContainer
          marginInlineStart={{ lg: 'space060', xl: 'space100' }}
          id="inline-ad-mpu"
        >
          <StickyAd />
        </StyledAdContainer>
      </Stack>
      <Divider
        overrides={{
          stylePreset: 'dashedDivider',
          marginBlockStart: 'space080'
        }}
      />
      <Stack
        flow="horizontal-center"
        stackDistribution="center"
        marginBlockStart="space060"
      >
        <Paginations
          totalItems={totalItems}
          pageSize={itemsPerPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
        />
      </Stack>
    </>
  );
};
