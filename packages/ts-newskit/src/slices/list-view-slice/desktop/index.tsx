// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React, { Fragment } from 'react';
import { Divider, Block, Stack } from 'newskit';
import { ArticleStack } from '../article-stack';
import {
  StyledMainDivider,
  StyledAdContainer,
  StyledDateText
} from '../styles';
import { convertDateToMonth } from '../../../utils/date-formatting';
import { groupArticlesByDate } from '../utils';
import { Paginations } from '../pagination';
import { ListViewSliceProps } from '..';
import { ListViewSliceLoading } from './loading';

export const ListViewSliceDesktop = ({
  leadArticles,
  clickHandler,
  currentPage = 1,
  handlePageChange,
  onPageChange,
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
          {isLoading ? (
            <ListViewSliceLoading itemsPerPage={itemsPerPage} />
          ) : (
            arrayOfArrays.map((arrayOfArray: any, index) => {
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
                      <Block
                        marginInlineEnd={{ md: 'space060', xl: 'space080' }}
                      >
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
            })
          )}
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
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      </Stack>
    </>
  );
};
