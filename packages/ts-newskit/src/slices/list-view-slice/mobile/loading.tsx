// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React, { Fragment } from 'react';
import { LoadingBlock } from '../styles';
import { CustomBlockLayout } from '../../shared';
import { Divider, Block } from 'newskit';

export const ListViewSliceLoading = ({
  itemsPerPage
}: {
  itemsPerPage: number;
}) => {
  return (
    <CustomBlockLayout>
      {Array.from(Array(itemsPerPage).keys()).map(item => (
        <Fragment key={item}>
          <Block>
            <LoadingBlock
              height="sizing020"
              width="109px"
              marginBlockEnd="space030"
            />
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
          {item !== itemsPerPage - 1 && (
            <Block marginBlock="space040">
              <Divider
                overrides={{
                  stylePreset: 'dashedDivider'
                }}
              />
            </Block>
          )}
        </Fragment>
      ))}
    </CustomBlockLayout>
  );
};
