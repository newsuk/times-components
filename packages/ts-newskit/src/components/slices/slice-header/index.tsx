import React from 'react';
import { NewsKitChevronRightIcon } from '../../../assets';
import { Block, Stack, IconButton, TitleBar } from 'newskit';

export interface SliceHeaderProps {
  title: string;
  href: string;
}

export const SliceHeader = ({ title, href }: SliceHeaderProps) => {
  return (
    <Block stylePreset="sliceHeaderPreset">
      <Stack
        flow="horizontal-center"
        stackDistribution="space-between"
        paddingBlock="space030"
      >
        <TitleBar
          overrides={{
            heading: {
              typographyPreset: 'editorialDisplay004',
              stylePreset: 'inkBrand010'
            },
            paddingInline: 'space000',
            paddingBlock: 'space000'
          }}
        >
          {title}
        </TitleBar>
        <IconButton
          size="medium"
          overrides={{
            stylePreset: 'iconButtonSolidPrimary'
          }}
          role="link"
          href={href}
        >
          <NewsKitChevronRightIcon
            overrides={{
              size: 'sizing080',
              stylePreset: 'sliceIconPreset'
            }}
          />
        </IconButton>
      </Stack>
    </Block>
  );
};
