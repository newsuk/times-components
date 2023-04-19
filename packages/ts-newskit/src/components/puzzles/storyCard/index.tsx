import React from 'react';
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

export const StoryCard = () => {
  return (
    <CardComposable overrides={{}}>
      <Visible sm xs>
        <CardMedia
          media={{
            hidden: true,
            loadingAspectRatio: '3:2',
            alt: 'story image',
            src: 'https://storybook.newskit.co.uk/placeholder-3x2.png'
          }}
        />
      </Visible>
      <CardContent>
        <Headline
          headingAs="h3"
          overrides={{
            marginBlock: 'space030',
            typographyPreset: 'utilityLabel010'
          }}
        >
          ChatGPT invents Sudoku-style puzzle to keep the humans busy
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
            typographyPreset: 'articleListTimeToRead'
          }}
        >
          Technology
        </Tag>
        <Tag
          overrides={{
            stylePreset: 'StoryCardTime',
            typographyPreset: 'articleListTimeToRead'
          }}
        >
          4 min read
        </Tag>
      </CardActions>
    </CardComposable>
  );
};
