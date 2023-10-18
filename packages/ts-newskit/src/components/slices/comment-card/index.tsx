import {
  CardComposable,
  CardContent,
  CardMedia,
  Block,
  useTheme
} from 'newskit';
import React from 'react';
import { CardHeadlineLink } from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';
import { ClickHandlerType, MouseEventType } from '../../../slices/types';
import { articleClickTracking } from '../../../utils/tracking';
import { ColouredText } from '../../coloured-text/index';

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
  id: string;
  images?: ImageProps;
  byline: string;
  headline: string;
  url: string;
  flag?: string;
}

export const CommentCard = ({
  article,
  clickHandler
}: {
  article: CommentCardProps;
  clickHandler: ClickHandlerType;
}) => {
  const theme = useTheme();

  const { id, images, byline, headline, url, flag } = article;
  const imageWithCorrectRatio =
    images && images.crops && images.crops.find(crop => crop.ratio === '1:1');

  const onClick = (event: MouseEventType) => {
    const articleForTracking = { headline, id, url };
    articleClickTracking(event, articleForTracking, clickHandler);
  };
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
            loadingAspectRatio: imageWithCorrectRatio.ratio,
            width: '77px',
            overrides: { stylePreset: 'imageCircle' },
            loading: 'lazy'
          }}
        />
      )}

      <CardContent rowGap="space030" alignContent="start">
        <CardHeadlineLink
          href={url}
          $color={theme.colors.sectionBrand050 || theme.colors.inkBrand010}
          $hoverColor={theme.colors.sectionBrand060}
          overrides={{ typographyPreset: 'editorialHeadline010' }}
          expand
          external={false}
          onClick={onClick}
        >
          {byline}
        </CardHeadlineLink>
        <ColouredText
          typographyPreset="editorialRegularHeadline020"
          $color="sectionBrand070"
        >
          {headline}
        </ColouredText>
        <Block marginBlockStart="space010">
          {flag && <TagAndFlag flag={flag} />}
        </Block>
      </CardContent>
    </CardComposable>
  );
};
