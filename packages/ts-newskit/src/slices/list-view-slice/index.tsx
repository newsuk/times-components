import React, { Fragment } from 'react';
import { LeadArticleProps } from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';
import { CustomBlockLayout, WrappedStackLayout } from '../shared';
import { Divider, Block, Stack, Visible } from 'newskit';
import { ArticleStack } from './artcile-stack';
import {
  StyledMainDivider,
  StyledAdContainer,
  StyledAdBlock,
  StyledDateText,
  AdBlockWrapperLargeAndAbove
} from './styles';
import { ListViewSliceMobile } from './mobile';
import { convertDateToMonth } from '../../utils/date-formatting';
import { groupArticlesByDate, removeDuplicateDates } from './utils';
import { Paginations } from './pagination';

export interface ListViewSliceProps {
  leadArticles: LeadArticleProps[];
  clickHandler: ClickHandlerType;
}

export const ListViewSlice = ({
  leadArticles,
  clickHandler
}: ListViewSliceProps) => {
  const mordifiedLeadArticles = leadArticles.map(item => ({
    ...item,
    headlineTypographyPreset: 'editorialHeadline020',
    isLeadImage: false
  }));

  const arrayOfArrays = Object.values(
    groupArticlesByDate(mordifiedLeadArticles)
  ).map(arrayOfArray => removeDuplicateDates(arrayOfArray));

  const articleWithAdSlot = arrayOfArrays.flat()[4];

  return (
    <CustomBlockLayout>
      <Visible md lg xl>
        <Stack flow="horizontal-top">
          <Block>
            {arrayOfArrays.map((arrayOfArray, index) => {
              return (
                <Fragment>
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
                          leadArticle={arrayOfArray}
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
          >
            <AdBlockWrapperLargeAndAbove>
              <Stack
                flow="horizontal-center"
                stackDistribution="center"
                marginBlock="space030"
              >
                ADVERTISEMENT
              </Stack>
              <StyledAdBlock />
            </AdBlockWrapperLargeAndAbove>
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
          <Paginations />
        </Stack>
      </Visible>
      <WrappedStackLayout>
        <Visible xs sm>
          <ListViewSliceMobile
            leadArticle={mordifiedLeadArticles}
            clickHandler={clickHandler}
          />
        </Visible>
      </WrappedStackLayout>
    </CustomBlockLayout>
  );
};
