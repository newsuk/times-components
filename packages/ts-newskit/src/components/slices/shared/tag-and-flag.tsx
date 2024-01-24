import React from 'react';
import { Block, TextBlock, Divider, LinkInline, MQ } from 'newskit';
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
  byline,
  isListView
}: TagAndFlagProps) => {
  const hasTag = tag && tag.label;
  const hasFlag = flag && flag !== '';
  const hasbyline = byline && byline.name !== '';
  const hasNoTagAndFlag = !hasTag && !hasFlag;

  if (hasNoTagAndFlag || (hasNoTagAndFlag && isListView && !hasbyline)) {
    return null;
  }

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

      {isListView &&
        byline && (
          <TagAndFlagWrapper>
            {byline.slug ? (
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
            )}
          </TagAndFlagWrapper>
        )}

      {flag && (
        <TagAndFlagWrapper>
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
        </TagAndFlagWrapper>
      )}
    </Block>
  );
};
