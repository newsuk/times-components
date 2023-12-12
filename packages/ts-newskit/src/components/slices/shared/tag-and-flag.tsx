import React from 'react';
import { Block, TextBlock, Divider } from 'newskit';
import { ContainerInline, TextLink } from '../shared-styles';
import { TagAndFlagProps } from '../../../slices/types';

const TagAndFlagWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <ContainerInline>
      <Divider
        vertical
        overrides={{
          marginInline: 'space020'
        }}
      />
    </ContainerInline>
  </>
);

export const TagAndFlag = ({
  flag,
  flagOverrides,
  tag,
  marginBlockStart = 'space000',
  byline
}: TagAndFlagProps) => {
  const hasTag = tag && tag.label;
  const hasFlag = flag && flag !== '';
  const hasbyline = byline && byline !== '';

  if (!hasTag && !hasFlag && !hasbyline) {
    return null;
  }

  return (
    <Block marginBlockStart={marginBlockStart} data-testid="tag-and-flag">
      {tag && (
        <TagAndFlagWrapper>
          <TextLink
            overrides={{
              typographyPreset: {
                xs: 'utilityButton010',
                md: 'utilityButton005'
              },
              stylePreset: 'inkBrand010'
            }}
            href={tag.href}
          >
            {tag.label}
          </TextLink>
        </TagAndFlagWrapper>
      )}

      {byline && (
        <TagAndFlagWrapper>
          <TextBlock
            typographyPreset={
              flagOverrides && flagOverrides.typographyPreset
                ? flagOverrides.typographyPreset
                : { xs: 'utilityButton010', md: 'utilityButton005' }
            }
            stylePreset={
              flagOverrides && flagOverrides.stylePreset
                ? flagOverrides.stylePreset
                : { xs: 'inkNonEssential', md: 'inkSubtle' }
            }
            as="span"
          >
            {byline}
          </TextBlock>
        </TagAndFlagWrapper>
      )}

      {flag && (
        <TagAndFlagWrapper>
          <TextBlock
            typographyPreset={
              flagOverrides && flagOverrides.typographyPreset
                ? flagOverrides.typographyPreset
                : { xs: 'utilityMeta010', md: 'utilityMeta005' }
            }
            stylePreset={
              flagOverrides && flagOverrides.stylePreset
                ? flagOverrides.stylePreset
                : { xs: 'inkNonEssential', md: 'inkSubtle' }
            }
            as="span"
          >
            {flag}
          </TextBlock>
        </TagAndFlagWrapper>
      )}
    </Block>
  );
};
