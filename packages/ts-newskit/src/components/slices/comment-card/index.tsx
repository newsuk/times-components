import { CardComposable, CardContent, CardMedia, TextBlock } from 'newskit';
import React from 'react';
import { CardHeadlineLink } from '../shared-styles';

type ImageCrops = {
  url?: string;
  ratio?: string;
};

type ImageProps = {
  alt?: string;
  credit?: string;
  crops?: ImageCrops[];
};

export interface CommentCardProps {
  image?: ImageProps;
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
  const imageWithCorrectRatio =
    image && image.crops && image.crops.find(crop => crop.ratio === '1:1');

  return (
    <CardComposable
      columnGap="space040"
      columns="77px 1fr"
      areas={`
        media content
      `}
    >
      {imageWithCorrectRatio && (
        <CardMedia
          media={{
            src: imageWithCorrectRatio.url,
            alt: (image && image.alt) || byline,
            loadingAspectRatio: imageWithCorrectRatio.ratio || '1:1',
            width: '77px',
            overrides: { stylePreset: 'imageCircle' }
          }}
        />
      )}

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
