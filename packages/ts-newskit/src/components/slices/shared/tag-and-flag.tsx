import React from 'react';
import { Block, TextBlock, Divider } from 'newskit';
import { ContainerInline, TextLink } from '../shared-styles';

export interface TagAndFlagProps {
  flag?: string;
  tag?: {
    label: string;
    href: string;
  };
  marginBlockStart?: string;
}

export const TagAndFlag = ({
  flag,
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
            typographyPreset: 'customTagAndFlagPreset',
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
          typographyPreset="customTagAndFlagPreset"
          stylePreset="inkSubtle"
          as="span"
        >
          {flag}
        </TextBlock>
      )}
    </Block>
  );
};
