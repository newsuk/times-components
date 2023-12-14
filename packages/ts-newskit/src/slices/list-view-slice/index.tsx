import React, { Fragment } from 'react';
import { LeadArticleProps } from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';
import { CustomBlockLayout, WrappedStackLayout } from '../shared';
import { Divider, TextBlock, Block, Stack, Visible } from 'newskit';
import { ArticleStack } from './artcile-stack';
import { StyledMainDivider, StyledAdContainer, StyledAdBlock } from './styles';
import { ListViewSliceMobile } from './mobile';
import { convertDateToMonth } from '../../utils/date-formatting';

export interface ListViewSliceProps {
  leadArticles: LeadArticleProps[];
  clickHandler: ClickHandlerType;
}

export const removeDuplicateDates = (data: LeadArticleProps[]) => {
  let uniqueDates = new Set();
  let processedData = data.map(item => {
    let datePublished = item.datePublished;
    if (uniqueDates.has(datePublished)) {
      return { ...item, datePublished: undefined };
    } else {
      uniqueDates.add(datePublished);
      return item;
    }
  });
  return processedData;
};

export const ListViewSlice = ({
  leadArticles,
  clickHandler
}: ListViewSliceProps) => {
  const mordifiedLeadArticles = leadArticles.map(item => ({
    ...item,
    headlineTypographyPreset: 'editorialHeadline020',
    isLeadImage: false
  }));

  mordifiedLeadArticles.sort((a, b) => {
    const dateA = a.datePublished ? new Date(a.datePublished) : null;
    const dateB = b.datePublished ? new Date(b.datePublished) : null;

    if (dateA === null && dateB === null) {
      return 0;
    } else if (dateA === null) {
      return -1;
    } else if (dateB === null) {
      return 1;
    } else {
      return dateA.getTime() - dateB.getTime();
    }
  });

  const initialEmptyObject: { [key: string]: LeadArticleProps[] } = {};
  const groupedByDate = mordifiedLeadArticles.reduce((result, article) => {
    const date = article.datePublished && article.datePublished.split('T')[0];

    if (date) {
      result[date] = result[date] || [];
      result[date].push(article);
    }

    return result;
  }, initialEmptyObject);

  const arrayOfArrays = Object.values(groupedByDate).map(arrayOfArray =>
    removeDuplicateDates(arrayOfArray)
  );

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
                        <TextBlock
                          typographyPreset={{
                            xs: 'utilityMeta010',
                            md: 'utilityMeta005'
                          }}
                          stylePreset={{
                            xs: 'utilityButton010',
                            md: 'utilityButton005'
                          }}
                          as="span"
                          style={{
                            whiteSpace: 'nowrap',
                            width: '109px'
                          }}
                        >
                          {arrayOfArray[0].datePublished &&
                            convertDateToMonth(arrayOfArray[0].datePublished)}
                        </TextBlock>
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
            <Block
              style={{
                position: 'fixed'
              }}
            >
              <Stack
                flow="horizontal-center"
                stackDistribution="center"
                marginBlock="space030"
              >
                ADVERTISEMENT
              </Stack>
              <StyledAdBlock />
            </Block>
          </StyledAdContainer>
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
