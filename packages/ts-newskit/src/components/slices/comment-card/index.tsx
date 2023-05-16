import {
  CardComposable,
  CardContent,
  CardMedia,
  useBreakpointKey,
  Divider,
  Flag,
  Block
} from 'newskit';
import React from 'react';
import {
  CardHeadlineLink,
  ColouredText,
  ColouredTextTag,
  ContainerInline
} from '../shared-styles';

export interface CommentCardProps {
  image?: string;
  heading: string;
  content: string;
  href: string;
  isBucket1?: boolean;
  color?: string;
  articleType?: string;
  readingTime?: string;
}

export const CommentCard = ({
  image,
  heading,
  content,
  href,
  isBucket1,
  color,
  articleType,
  readingTime
}: CommentCardProps) => {
  const breakpointKey = useBreakpointKey();
  const isBucket1True = isBucket1 && breakpointKey === 'md';

  const stylePresets = {
    typographyPreset: 'utilityButton010',
    stylePreset: 'inkBrand010',
    paddingBlockStart: 'space040',
    paddingInline: 'space000',
    paddingBlock: 'space000',
    iconSize: 'iconSize010',
    spaceInline: 'space010',
    minHeight: '30px'
  };

  return (
    <CardComposable
      columnGap="space040"
      overrides={{ paddingBlock: 'space020' }}
      columns={isBucket1True ? '1fr' : '77px 1fr'}
      areas={isBucket1True ? `content` : `media content `}
    >
      {!isBucket1True && (
        <CardMedia
          media={{
            width: '77px',
            src: image,
            alt: heading,
            loadingAspectRatio: '1:1',
            overrides: { stylePreset: 'imageCircle' }
          }}
        />
      )}
      <CardContent
        rowGap={isBucket1True ? 'space000' : 'space040'}
        alignContent="start"
      >
        {!isBucket1True && (
          <CardHeadlineLink
            href={href}
            $color="inkBrand010"
            overrides={{ typographyPreset: 'editorialHeadline020' }}
            expand
          >
            {heading}
          </CardHeadlineLink>
        )}
        <ColouredText $color="inkBase" typographyPreset="editorialHeadline020">
          {content}
        </ColouredText>
        {isBucket1True && (
          <Block>
            <ColouredTextTag
              size="small"
              overrides={{
                ...stylePresets
              }}
              $color={color}
            >
              {articleType}
            </ColouredTextTag>
            {articleType &&
              readingTime && (
                <ContainerInline>
                  <Divider
                    vertical
                    overrides={{
                      marginInline: 'space020'
                    }}
                  />
                </ContainerInline>
              )}
            <Flag
              size="small"
              overrides={{
                ...stylePresets,
                stylePreset: 'inkSubtle',
                typographyPreset: 'utilityLabel010'
              }}
            >
              {readingTime}
            </Flag>
          </Block>
        )}
      </CardContent>
    </CardComposable>
  );
};
