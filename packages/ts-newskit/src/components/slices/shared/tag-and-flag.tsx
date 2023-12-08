import React from 'react';
import { Block, TextBlock, Divider } from 'newskit';
import { ContainerInline, TextLink } from '../shared-styles';
import { TagAndFlagProps } from '../../../slices/types';

export const TagAndFlag = ({
  flag,
  flagOverrides,
  tag,
  marginBlockStart = 'space000'
}: TagAndFlagProps) => {
  const hasTag = tag && tag.label;
  const hasFlag = flag && flag !== '';

  if (!hasTag && !hasFlag) {
    return null;
  }

  return (
    <Block marginBlockStart={marginBlockStart} data-testid="tag-and-flag">
      {tag && (
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
      )}

      {tag &&
        Object.keys(tag).length > 0 &&
        tag.label !== '' &&
        flag && (
          <ContainerInline>
            <Divider
              vertical
              overrides={{
                marginInline: 'space020'
              }}
            />
          </ContainerInline>
        )}

      {flag && (
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
      )}
    </Block>
  );
};
