import React from 'react';
import { NewsKitChevronRightIcon } from '../../../assets';
import { FlagSize, IconButton, TitleBar, Visible, MQ } from 'newskit';
import {
  SliceHeaderWrapper,
  SliceHeaderLink,
  SliceHeaderContainer
} from './styles';

export interface SliceHeaderProps {
  title: string;
  href?: string;
  titleTypographyPreset?: MQ<string>;
  iconArrowSize?: MQ<string>;
  iconSize?: MQ<FlagSize>;
  padding?: string;
  sliceHeaderClickHandler: (title: string) => void;
}

export const SliceHeader = ({
  title,
  href,
  titleTypographyPreset = {
    xs: 'editorialDisplay003',
    md: 'editorialDisplay004'
  },
  iconArrowSize = { xs: 'iconSize010', md: 'iconSize020' },
  iconSize = { xs: 'small', md: 'medium' },
  padding = 'space030',
  sliceHeaderClickHandler
}: SliceHeaderProps) => {
  return (
    <SliceHeaderWrapper
      stylePreset={{
        xs: 'sliceHeaderPresetMobile',
        md: 'sliceHeaderPresetDesktop'
      }}
    >
      <SliceHeaderLink
        href={href}
        onClick={() => sliceHeaderClickHandler(title)}
      >
        <SliceHeaderContainer
          flow="horizontal-center"
          stackDistribution="space-between"
          paddingBlock={padding}
          paddingInline={{ xs: 'space045', md: 'space000' }}
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
            <>
              <Visible xs sm>
                <IconButton
                  size={typeof iconSize === 'object' ? iconSize.xs : iconSize}
                  overrides={{
                    stylePreset: 'sliceIconPreset',
                    iconSize: iconArrowSize
                  }}
                >
                  <NewsKitChevronRightIcon />
                </IconButton>
              </Visible>
              <Visible md lg xl>
                <IconButton
                  size={typeof iconSize === 'object' ? iconSize.md : iconSize}
                  overrides={{
                    stylePreset: 'sliceIconPreset',
                    iconSize: iconArrowSize
                  }}
                >
                  <NewsKitChevronRightIcon />
                </IconButton>
              </Visible>
            </>
          )}
        </SliceHeaderContainer>
      </SliceHeaderLink>
    </SliceHeaderWrapper>
  );
};
