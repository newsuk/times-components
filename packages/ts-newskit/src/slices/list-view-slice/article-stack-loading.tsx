import React from 'react';
import { Block, Stack } from 'newskit';
import { LoadingBlock } from './styles';

export const ArticleStackLoading = () => {
  return (
    <Stack flow="horizontal-top" stackDistribution="space-between" flexGrow={1}>
      <Block marginInlineEnd="space060">
        <LoadingBlock
          marginBlockEnd="space030"
          height="sizing020"
          width="185px"
        />
        <LoadingBlock marginBlockEnd="space030" height="sizing050" />
        <LoadingBlock marginBlockEnd="space030" height="sizing080" />
        <LoadingBlock
          marginBlockEnd="space030"
          height="sizing020"
          width="110px"
        />
      </Block>
      <LoadingBlock height="93px" width="140px" />
    </Stack>
  );
};
