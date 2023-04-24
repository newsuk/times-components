import React, { FC } from 'react';
import { CardMedia, GridLayout } from 'newskit';
import { Headline } from 'newskit';
import { NewsKitArticlePlaceholder } from '../../../assets';
import {
  CardActions,
  CardContent,
  Tag,
  CardComposable,
  Visible,
  CardLink
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
            stylePreset: 'StoryCardLink'
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
              stylePreset: 'StoryCardCategory',
              typographyPreset: 'utilityLabel010',
              minHeight: '16px'
            }}
          >
            {category}
          </Tag>
          <Tag
            overrides={{
              stylePreset: 'StoryCardTime',
              typographyPreset: 'utilityLabel010',
              minHeight: '16px'
            }}
          >
            {timeToRead}
          </Tag>
        </GridLayout>
      </CardActions>
    </CardComposable>
  );
};
