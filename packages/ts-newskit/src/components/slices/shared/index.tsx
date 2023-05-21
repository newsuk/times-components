import React from 'react';
import { Block, TextBlock, Divider } from 'newskit';
import { ContainerInline, TextLink } from '../shared-styles';

export interface TagAndFlagProps {
  flag?: string;
  tag?: string;
  href: string;
  marginBlockStart?: string;
}

export const TagAndFlag = ({
  flag,
  tag,
  href,
  marginBlockStart
}: TagAndFlagProps) => {
  return (
    <Block
      marginBlockStart={marginBlockStart || 'space000'}
      data-testid="tag-and-flag"
    >
      <TextLink
        overrides={{
          typographyPreset: 'utilityButton010',
          stylePreset: 'inkBrand010'
        }}
        href={href}
      >
        {tag}
      </TextLink>
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
      <TextBlock
        typographyPreset="utilityLabel010"
        stylePreset="inkSubtle"
        as="span"
      >
        {flag}
      </TextBlock>
    </Block>
  );
};
