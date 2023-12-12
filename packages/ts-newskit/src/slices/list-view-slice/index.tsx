import React, { Fragment } from 'react';
import { LeadArticleProps } from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';
import { CustomBlockLayout } from '../shared';
import { Divider, TextBlock, Block, Stack, Visible } from 'newskit';
import { ArticleStack } from './artcile-stack';
import { StyledMainDivider, StyledAdContainer, StyledAdBlock } from './styles';
import { ListViewSliceMobile } from './mobile';

export interface ListViewSliceProps {
  leadArticle: LeadArticleProps[];
  clickHandler: ClickHandlerType;
}
export function formatDate(publishDate: string) {
  const timestamp = new Date(publishDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  return timestamp;
}

export function removeDuplicateDates(data: LeadArticleProps[]) {
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
}

export const ListViewSlice = ({
  leadArticle,
  clickHandler
}: ListViewSliceProps) => {
  leadArticle.sort(
    (a, b) => new Date(a.datePublished) - new Date(b.datePublished)
  );

  const groupedByDate = leadArticle.reduce((result, article) => {
    const date = article.datePublished.split('T')[0];
    result[date] = result[date] || [];
    result[date].push(article);
    return result;
  }, {});

  const arrayOfArrays = Object.values(groupedByDate).map(arrayOfArray =>
    removeDuplicateDates(arrayOfArray)
  );

  const fifthArticle = arrayOfArrays.flat()[4];

  return (
    <CustomBlockLayout>
      <Visible md lg xl>
        <Stack flow="horizontal-top">
          <Block>
            {arrayOfArrays.map((item, index) => {
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
                          {item[0].datePublished &&
                            formatDate(item[0].datePublished)}
                        </TextBlock>
                      </Block>
                      <Block>
                        <ArticleStack
                          leadArticle={item}
                          clickHandler={clickHandler}
                          fifthArticle={fifthArticle}
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
              <Stack flow="horizontal-top">
                <TextBlock>Advertisement</TextBlock>
              </Stack>
              <Block
                style={{
                  width: '300px',
                  height: '600px',
                  background: '#FF5858'
                }}
              />
            </Block>
          </StyledAdContainer>
        </Stack>
      </Visible>
      <Visible xs sm>
        <ListViewSliceMobile
          leadArticle={leadArticle}
          clickHandler={clickHandler}
        />
      </Visible>
    </CustomBlockLayout>
  );
};
