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
  marginBlockStart
}: TagAndFlagProps) => {
  return (
    <Block
      marginBlockStart={marginBlockStart || 'space000'}
      data-testid="tag-and-flag"
    >
      {tag && (
        <TextLink
          overrides={{
            typographyPreset: 'utilityButton010',
            stylePreset: 'inkBrand010'
          }}
          href={tag.href}
        >
          {tag.label}
        </TextLink>
      )}

      {tag &&
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
          typographyPreset="utilityLabel010"
          stylePreset="inkSubtle"
          as="span"
        >
          {flag}
        </TextBlock>
      )}
    </Block>
  );
};
