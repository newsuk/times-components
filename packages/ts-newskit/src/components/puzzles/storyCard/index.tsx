import React, { FC } from 'react';
import { CardMedia } from 'newskit';
import { Headline } from 'newskit';
//import { IconFilledImage } from 'newskit';
import {
  CardActions,
  CardContent,
  Tag,
  CardComposable,
  Visible
} from 'newskit';

interface CardProps {
  image: string;
  title: string;
  url: string;
  category: string;
  categoryUrl: string;
  timeToRead: string;
}

export const StoryCard: FC<CardProps> = ({
  image,
  title,
  url,
  category,
  categoryUrl,
  timeToRead
}) => {
  return (
    <CardComposable overrides={{}}>
      <Visible lg sm xs>
        <CardMedia
          media={{
            hidden: true,
            loadingAspectRatio: '3:2',
            alt: 'story image',
            src: image
          }}
        />
      </Visible>
      <CardContent>
        <Headline
          headingAs="h3"
          overrides={{
            marginBlock: 'space030',
            typographyPreset: 'editorialHeadline020'
          }}
        >
          {title}
        </Headline>
      </CardContent>
      <CardActions
        overrides={{
          stylePreset: 'StoryCardFlexWrapper'
        }}
      >
        <Tag
          href="#"
          overrides={{
            stylePreset: 'StoryCardCategory',
            marginInlineEnd: 'space020',
            typographyPreset: 'utilityLabel010'
          }}
        >
          {category}
        </Tag>
        <Tag
          overrides={{
            stylePreset: 'StoryCardTime',
            typographyPreset: 'utilityLabel010'
          }}
        >
          {timeToRead}
        </Tag>
      </CardActions>
    </CardComposable>
  );
};
