import React, { Fragment } from 'react';
import { Divider, Block, Stack } from 'newskit';
import { StyledMainDivider, LoadingBlock } from '../styles';
import { ArticleStackLoading } from '../article-stack-loading';

export const ListViewSliceLoading = ({
  itemsPerPage
}: {
  itemsPerPage: number;
}) => {
  return (
    <Stack flow="horizontal-top">
      <Block>
        {Array.from(Array(itemsPerPage).keys()).map(item => (
          <Fragment key={item}>
            <StyledMainDivider>
              {item > 0 && (
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
                  <LoadingBlock
                    height="sizing020"
                    width="109px"
                    marginBlockEnd="space030"
                  />
                </Block>
                <Block>
                  <ArticleStackLoading />
                </Block>
              </Stack>
            </StyledMainDivider>
          </Fragment>
        ))}
      </Block>
    </Stack>
  );
};
