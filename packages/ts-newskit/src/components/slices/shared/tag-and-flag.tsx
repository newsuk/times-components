import React from 'react';
import { Block, TextBlock, Divider, LinkInline } from 'newskit';
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

  if (!hasTag && !hasFlag && !hasbyline) {
    return null;
  }

  const defaultStylePreset = (xsStyle: string, mdStyle: string) =>
    flagOverrides && flagOverrides.stylePreset
      ? flagOverrides.stylePreset
      : { xs: xsStyle, md: mdStyle };
  const defaultTypographyPreset = (xsStyle: string, mdStyle: string) =>
    flagOverrides && flagOverrides.typographyPreset
      ? flagOverrides.typographyPreset
      : { xs: xsStyle, md: mdStyle };

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
                  typographyPreset: defaultTypographyPreset(
                    'utilityButton010',
                    'utilityButton005'
                  ),
                  stylePreset: defaultStylePreset(
                    'inkNonEssential',
                    'inkSubtle'
                  )
                }}
                href={`/profile/${byline.slug}`}
              >
                {byline.name}
              </LinkInline>
            ) : (
              <TextBlock
                typographyPreset={defaultTypographyPreset(
                  'utilityButton010',
                  'utilityButton005'
                )}
                stylePreset={defaultStylePreset('inkNonEssential', 'inkSubtle')}
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
            typographyPreset={defaultTypographyPreset(
              'utilityMeta010',
              'utilityMeta005'
            )}
            stylePreset={defaultStylePreset('inkNonEssential', 'inkSubtle')}
            as="span"
          >
            {flag}
          </TextBlock>
        </TagAndFlagWrapper>
      )}
    </Block>
  );
};
