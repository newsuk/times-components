import React from 'react';
import { NewsKitChevronRightIcon } from '../../../assets';
import { Block, FlagSize, IconButton, TitleBar } from 'newskit';
import { SliceHeaderContainer } from './styles';

export interface SliceHeaderProps {
  title: string;
  href?: string;
  titleTypographyPreset?: string;
  iconArrowSize?: string;
  iconSize?: FlagSize;
  padding?: string;
  sliceHeaderClickHandler: (title: string) => void;
}

export const SliceHeader = ({
  title,
  href,
  titleTypographyPreset = 'editorialDisplay004',
  iconArrowSize = 'iconSize020',
  iconSize = 'medium',
  padding = 'space030',
  sliceHeaderClickHandler
}: SliceHeaderProps) => {
  return (
    <Block stylePreset="sliceHeaderPreset">
      <SliceHeaderContainer
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
        {href && (
          <IconButton
            size={iconSize}
            overrides={{
              stylePreset: 'sliceIconPreset',
              iconSize: iconArrowSize
            }}
            role="link"
            href={href}
            onClick={() => sliceHeaderClickHandler(title)}
          >
            <NewsKitChevronRightIcon />
          </IconButton>
        )}
      </SliceHeaderContainer>
    </Block>
  );
};
