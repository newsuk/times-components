import { CardComposable, CardContent, CardMedia, TextBlock } from 'newskit';
import React from 'react';
import { CardHeadlineLink } from '../shared-styles';

export interface CommentCardProps {
  image?: string;
  byline: string;
  headline: string;
  href: string;
}

export const CommentCard = ({
  image,
  byline,
  headline,
  href
}: CommentCardProps) => {
  return (
    <CardComposable
      columnGap="space040"
      columns="77px 1fr"
      areas={`
        media content
      `}
    >
      <CardMedia
        media={{
          width: '77px',
          src: image,
          alt: byline,
          loadingAspectRatio: '1:1',
          overrides: { stylePreset: 'imageCircle' }
        }}
      />
      <CardContent rowGap="space040" alignContent="start">
        <CardHeadlineLink
          href={href}
          $color="inkBrand010"
          overrides={{ typographyPreset: 'editorialHeadline020' }}
          expand
        >
          {byline}
        </CardHeadlineLink>
        <TextBlock
          stylePreset="inkBase"
          typographyPreset="editorialHeadline020"
        >
          {headline}
        </TextBlock>
      </CardContent>
    </CardComposable>
  );
};
