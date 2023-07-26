import { CardComposable, CardContent, CardMedia, TextBlock } from 'newskit';
import React from 'react';
import { CardHeadlineLink } from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';

type ImageCrops = {
  url?: string;
  ratio?: string;
};

type ImageProps = {
  alt?: string;
  caption?: string;
  crops?: ImageCrops[];
};

export interface CommentCardProps {
  images?: ImageProps;
  byline: string;
  headline: string;
  href: string;
  flag?: string;
}

export const CommentCard = ({
  images,
  byline,
  headline,
  href,
  flag
}: CommentCardProps) => {
  const imageWithCorrectRatio =
    images && images.crops && images.crops.find(crop => crop.ratio === '1:1');

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
            alt: (images && images.alt) || byline,
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
        {flag && <TagAndFlag flag={flag} />}
      </CardContent>
    </CardComposable>
  );
};
