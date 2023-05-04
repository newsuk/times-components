import React from 'react';
import {
  Headline,
  Divider,
  CardComposable,
  CardMedia,
  CardContent,
  Block,
  TextBlock,
  Card
} from 'newskit';
import { CardHeadlineLink, ContainerInline } from '../shared-styles';

type ImageProps = {
  src: string;
  alt?: string;
  caption?: string;
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
  return (
    <>
      {hasTopBorder && (
        <Divider
          overrides={{ marginBlock: 'space040', stylePreset: 'dashedDivider' }}
        />
      )}

      <Card>
        {image &&
          !hideImage && (
            <CardMedia
              media={
                hideImage
                  ? undefined
                  : {
                      src: image.src,
                      alt: image.alt || title
                    }
              }
            />
          )}
          
        <CardContent
          overrides={{
            marginInline: isLeadImage ? 'space045' : 'space000'
          }}
        >
          {image &&
            image.caption &&
            !hideImage && (
              <TextBlock
                paddingBlockStart="space020"
                stylePreset="inkSubtle"
                typographyPreset="utilityMeta010"
              >
                {image.caption}
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
      </Card>
    </>
  );
};
