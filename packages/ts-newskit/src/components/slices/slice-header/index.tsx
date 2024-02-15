// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React from 'react';
import { NewsKitChevronRightIcon } from '../../../assets';
import { MQ } from 'newskit';
import {
  SliceHeaderWrapper,
  SliceHeaderLink,
  SliceHeaderContainer,
  TitleBarContainer,
  StyledDivider,
  StyledTitleBar,
  StyledIconButton,
  Tagline,
  TaglineMob
} from './styles';

export interface SliceHeaderProps {
  title: string;
  href?: string;
  tagline?: string;
  titleTypographyPreset?: MQ<string>;
  iconArrowSize?: MQ<string>;
  iconSize?: MQ<string>;
  padding?: string;
  sliceHeaderClickHandler: (title: string) => void;
  showDivider?: boolean;
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
  tagline,
  titleTypographyPreset = {
    xs: 'editorialDisplay003',
    md: 'editorialDisplay004'
  },
  iconArrowSize = { xs: 'iconSize010', md: 'iconSize020' },
  iconSize = { xs: 'sizing060', md: 'sizing080' },
  padding = 'space030',
  sliceHeaderClickHandler,
  showDivider = true
}: SliceHeaderProps) => {
  return (
    <SliceHeaderWrapper
      showDivider={showDivider}
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
          <TitleBarContainer flow="horizontal-center">
            <StyledTitleBar
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
            </StyledTitleBar>
            {tagline && (
              <>
                <StyledDivider
                  overrides={{
                    stylePreset: 'lightDivider',
                    marginInline: 'space030'
                  }}
                  vertical
                />
                <Tagline
                  typographyPreset="editorialCaption010"
                  stylePreset="inkSubtle"
                >
                  {tagline}
                </Tagline>
              </>
            )}
          </TitleBarContainer>
          {href && (
            <StyledIconButton
              overrides={{
                stylePreset: 'sliceIconPreset',
                iconSize: iconArrowSize,
                height: iconSize,
                width: iconSize,
                marginInlineStart: 'space040'
              }}
            >
              <NewsKitChevronRightIcon />
            </StyledIconButton>
          )}
        </SliceHeaderContainer>
      </SliceHeaderLinkWrapper>
      <TaglineMob
        typographyPreset="editorialCaption010"
        stylePreset="inkSubtle"
        paddingInline="space045"
        paddingBlockEnd="space040"
      >
        {tagline}
      </TaglineMob>
    </SliceHeaderWrapper>
  );
};
