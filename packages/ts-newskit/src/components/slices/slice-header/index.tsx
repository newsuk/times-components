import React from 'react';
import { NewsKitChevronRightIcon } from '../../../assets';
import { Block, FlagSize, IconButton, Stack, TitleBar } from 'newskit';

export interface SliceHeaderProps {
  title: string;
  href: string;
  titleTypographyPreset?: string;
  iconArrowSize?: string;
  iconSize?: FlagSize;
  padding?: string;
}

export const SliceHeader = ({
  title,
  href,
  titleTypographyPreset = 'editorialDisplay004',
  iconArrowSize = 'iconSize020',
  iconSize = 'medium',
  padding = 'space030'
}: SliceHeaderProps) => {
  return (
    <Block stylePreset="sliceHeaderPreset">
      <Stack
        flow="horizontal-center"
        stackDistribution="space-between"
        paddingBlock={padding}
      >
        <TitleBar
          overrides={{
            heading: {
              typographyPreset: titleTypographyPreset,
              stylePreset: 'inkBrand010'
            },
            paddingInline: 'space000',
            paddingBlock: 'space000'
          }}
        >
          {title}
        </TitleBar>
        <IconButton
          size={iconSize}
          overrides={{
            stylePreset: 'sliceIconPreset',
            iconSize: iconArrowSize
          }}
          role="link"
          href={href}
        >
          <NewsKitChevronRightIcon />
        </IconButton>
      </Stack>
    </Block>
  );
};
