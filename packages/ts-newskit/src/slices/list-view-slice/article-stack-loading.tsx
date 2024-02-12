// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

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
