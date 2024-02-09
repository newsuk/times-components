// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React from 'react';
import { Block, TextBlock, Divider, LinkInline, MQ } from 'newskit';
import { ContainerInline, TextLink } from '../shared-styles';
import { TagAndFlagProps } from '../../../slices/types';

const TagAndFlagDivider = () => (
  <ContainerInline>
    <Divider
      vertical
      overrides={{
        marginInline: 'space020'
      }}
    />
  </ContainerInline>
);

export const TagAndFlag = ({
  flag,
  flagOverrides,
  tag,
  marginBlockStart = 'space000',
  byline,
  isListView
}: TagAndFlagProps) => {
  const defaultStylePreset = (preset: MQ<string>) =>
    flagOverrides && flagOverrides.stylePreset
      ? flagOverrides.stylePreset
      : preset;

  const defaultTypographyPreset = (preset: MQ<string>) =>
    flagOverrides && flagOverrides.typographyPreset
      ? flagOverrides.typographyPreset
      : preset;

  return (
    <Block marginBlockStart={marginBlockStart} data-testid="tag-and-flag">
      {tag &&
        tag.label !== '' && (
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

      {tag && tag.label && (byline || flag) && <TagAndFlagDivider />}

      {isListView &&
        byline &&
        (byline.slug ? (
          <LinkInline
            overrides={{
              typographyPreset: defaultTypographyPreset({
                xs: 'utilityButton010',
                md: 'utilityButton005'
              }),
              stylePreset: defaultStylePreset({
                xs: 'inkNonEssential',
                md: 'inkSubtle'
              })
            }}
            href={`/profile/${byline.slug}`}
          >
            {byline.name}
          </LinkInline>
        ) : (
          <TextBlock
            typographyPreset={defaultTypographyPreset({
              xs: 'utilityButton010',
              md: 'utilityButton005'
            })}
            stylePreset={defaultStylePreset({
              xs: 'inkNonEssential',
              md: 'inkSubtle'
            })}
            as="span"
          >
            {byline.name}
          </TextBlock>
        ))}

      {byline && byline.name && flag && <TagAndFlagDivider />}

      {flag && (
        <TextBlock
          typographyPreset={defaultTypographyPreset({
            xs: 'utilityMeta010',
            md: 'utilityMeta005'
          })}
          stylePreset={defaultStylePreset({
            xs: 'inkNonEssential',
            md: 'inkSubtle'
          })}
          as="span"
        >
          {flag}
        </TextBlock>
      )}
    </Block>
  );
};
