import { Divider, Stack } from 'newskit';
import React from 'react';
import {
  JournalistQuote,
  JournalistQuoteProps
} from '../../components/slices/journalist-quote';
import { AvatarDivider } from '../shared-styles';

interface JournalistStackProps {
  journalists: JournalistQuoteProps[];
}
export const JournalistStack = ({ journalists }: JournalistStackProps) => {
  return (
    <>
      <Divider
        overrides={{ marginBlock: 'space040', stylePreset: 'dashedDivider' }}
      />
      <Stack
        flow={{ xs: 'vertical-left', md: 'horizontal-center' }}
        stackDistribution="space-evenly"
      >
        {journalists.map((journalist, journalistIndex, journalistArr) => {
          const hasBorder = journalistIndex < journalistArr.length - 1 && (
            <AvatarDivider
              overrides={{
                marginInline: { md: 'space040' },
                marginBlock: { xs: 'space040', md: 'space000' },
                stylePreset: 'lightDivider'
              }}
              vertical={{ xs: false, md: true }}
            />
          );

          return (
            <React.Fragment key={journalist.journalist.name}>
              <JournalistQuote {...journalist} />
              {hasBorder}
            </React.Fragment>
          );
        })}
      </Stack>
    </>
  );
};
