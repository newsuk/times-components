import React from 'react';
import { NewsKitChevronRightIcon } from '../../../assets';
import { IconButton, TitleBar, MQ } from 'newskit';
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
  iconSize?: MQ<string>;
  padding?: string;
  sliceHeaderClickHandler: (title: string) => void;
}

const SliceHeaderLinkWrapper = ({
  href,
  onClick,
  children
}: {
  onClick: () => void;
  href?: string;
  children: React.ReactNode;
}) => {
  if (href) {
    return (
      <SliceHeaderLink href={href} onClick={onClick} tabIndex={0}>
        {children}
      </SliceHeaderLink>
    );
  }
  return <>{children}</>;
};

export const SliceHeader = ({
  title,
  href,
  titleTypographyPreset = {
    xs: 'editorialDisplay003',
    md: 'editorialDisplay004'
  },
  iconArrowSize = { xs: 'iconSize010', md: 'iconSize020' },
  iconSize = { xs: 'sizing060', md: 'sizing080' },
  padding = 'space030',
  sliceHeaderClickHandler,
}: SliceHeaderProps) => {
  return (
    <SliceHeaderWrapper
      stylePreset={{
        xs: 'sliceHeaderPresetMobile',
        md: 'sliceHeaderPresetDesktop'
      }}
    >
      <SliceHeaderLinkWrapper
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
            <IconButton
              overrides={{
                stylePreset: 'sliceIconPreset',
                iconSize: iconArrowSize,
                height: iconSize,
                width: iconSize
              }}
            >
              <NewsKitChevronRightIcon />
            </IconButton>
          )}
        </SliceHeaderContainer>
      </SliceHeaderLinkWrapper>
    </SliceHeaderWrapper>
  );
};
