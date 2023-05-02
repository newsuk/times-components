import React, { FC } from 'react';
import { NewsKitArticlePlaceholder } from '../../../assets';
import {
  CardActions,
  CardContent,
  Tag,
  CardComposable,
  Visible,
  CardLink,
  Headline,
  CardMedia,
  GridLayout
} from 'newskit';

export interface StoryCardProps {
  image: string;
  altText: string;
  title: string;
  url: string;
  category: string;
  timeToRead: string;
  imgHiddenMobile: boolean;
}

export const StoryCard: FC<StoryCardProps> = ({
  image,
  altText,
  title,
  url,
  category,
  timeToRead,
  imgHiddenMobile
}) => {
  return (
    <CardComposable>
      <Visible xs={!imgHiddenMobile} sm={!imgHiddenMobile} md lg xl>
        {image ? (
          <CardMedia
            media={{
              loadingAspectRatio: '3:2',
              alt: altText ? altText : title,
              src: image,
              placeholderIcon: true
            }}
          />
        ) : (
          <NewsKitArticlePlaceholder data-testid="storyCard-placeholder" />
        )}
      </Visible>
      <CardContent>
        <CardLink
          expand
          href={url}
          data-testid="storyCard-link"
          overrides={{
            externalIcon: {
              size: '0'
            },
            stylePreset: 'inkContrast'
          }}
        >
          <Headline
            headingAs="h3"
            overrides={{
              marginBlock: 'space040',
              typographyPreset: 'editorialHeadline020'
            }}
          >
            {title}
          </Headline>
        </CardLink>
      </CardContent>
      <CardActions>
        <GridLayout columns="repeat(2, auto)" columnGap="space020">
          <Tag
            overrides={{
              stylePreset: 'inkContrast',
              typographyPreset: 'utilityLabel010',
              minHeight: '16px',
              paddingBlock: '0',
              paddingInline: '0'
            }}
          >
            {category}
          </Tag>
          <Tag
            overrides={{
              stylePreset: 'inkSubtle',
              typographyPreset: 'utilityLabel010',
              minHeight: '16px',
              paddingBlock: '0',
              paddingInline: '0'
            }}
          >
            {timeToRead}
          </Tag>
        </GridLayout>
      </CardActions>
    </CardComposable>
  );
};
