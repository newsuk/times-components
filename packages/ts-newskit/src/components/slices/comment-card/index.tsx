import { CardComposable, CardContent, CardMedia, TextBlock } from 'newskit';
import React from 'react';
import { CardHeadlineLink } from '../shared-styles';

export interface CommentCardProps {
  image?: string;
  heading: string;
  content: string;
  href: string;
}

export const CommentCard = ({
  image,
  heading,
  content,
  href
}: CommentCardProps) => {
  return (
    <CardComposable
      columnGap="space040"
      overrides={{ paddingBlock: 'space020' }}
      columns="77px 1fr"
      areas={`
        media content
      `}
    >
      <CardMedia
        media={{
          width: '77px',
          src: image,
          alt: heading,
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
          {heading}
        </CardHeadlineLink>
        <TextBlock
          stylePreset="inkBase"
          typographyPreset="editorialHeadline020"
        >
          {content}
        </TextBlock>
      </CardContent>
    </CardComposable>
  );
};
