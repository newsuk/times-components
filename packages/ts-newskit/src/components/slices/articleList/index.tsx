import React from 'react';
import {
  Divider,
  CardContent,
  Block,
  TextBlock,
  CardComposable,
  CardMedia,
  GridLayoutItem
} from 'newskit';
import {
  CardHeadlineLink,
  ContainerInline,
  FullWidthCardMediaMob
} from '../shared-styles';

type ImageProps = {
  src: string;
  alt?: string;
  credit?: string;
};

export interface ArticleListItemProps {
  color?: string;
  title: string;
  url: string;
  image?: ImageProps;
  articleType?: string;
  timeToRead?: string;
  hasTopBorder?: boolean;
  hideImage?: boolean;
  isLeadImage?: boolean;
}

export const ArticleListItem = ({
  image,
  title,
  url,
  articleType,
  timeToRead,
  hasTopBorder,
  hideImage,
  isLeadImage
}: ArticleListItemProps) => {
  const cardImage = !hideImage &&
    image && {
      media: {
        src: image.src,
        alt: image.alt || title
      }
    };

  const CardMediaComponent = isLeadImage ? FullWidthCardMediaMob : CardMedia;

  return (
    <CardComposable
      alignContent="start"
      areas={`
      border
      media
      content
    `}
    >
      {hasTopBorder && (
        <GridLayoutItem area="border">
          <Divider
            overrides={{
              marginBlockStart: 'space040',
              marginBlockEnd: hideImage ? 'space000' : 'space040',
              stylePreset: 'dashedDivider'
            }}
          />
        </GridLayoutItem>
      )}

      {image && !hideImage && <CardMediaComponent {...cardImage} />}

      <CardContent>
        {image &&
          image.credit &&
          !hideImage && (
            <TextBlock
              paddingBlockStart="space020"
              stylePreset="inkSubtle"
              typographyPreset="utilityMeta010"
            >
              {image.credit}
            </TextBlock>
          )}

        <CardHeadlineLink
          href={url}
          role="link"
          overrides={{
            typographyPreset: 'editorialHeadline020',
            paddingBlockStart: 'space040'
          }}
        >
          {title}
        </CardHeadlineLink>

        {(articleType || timeToRead) && (
          <Block>
            <TextBlock
              typographyPreset="articleListArticleType"
              as="span"
              marginBlockStart="space030"
            >
              {articleType}
            </TextBlock>
            {articleType &&
              timeToRead && (
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
              typographyPreset="articleListTimeToRead"
              stylePreset="articleListTimeToRead"
              as="span"
              marginBlockStart="space030"
            >
              {timeToRead}
            </TextBlock>
          </Block>
        )}
      </CardContent>
    </CardComposable>
  );
};
