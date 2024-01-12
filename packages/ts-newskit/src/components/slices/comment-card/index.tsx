import {
  CardComposable,
  CardContent,
  Block,
  useTheme,
  Image,
  GridLayoutItem
} from 'newskit';
import React from 'react';
import { CardHeadlineLink } from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';
import {
  ClickHandlerType,
  MouseEventType,
  ImageProps
} from '../../../slices/types';
import { articleClickTracking } from '../../../utils/tracking';

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
  clickHandler,
  isCommentBucket1
}: {
  article: CommentCardProps;
  clickHandler: ClickHandlerType;
  isCommentBucket1?: boolean;
}) => {
  const theme = useTheme();

  const { id, images, byline, headline, url, flag } = article;
  const imageWithCorrectRatio =
    images && images.crops
      ? images.crops.find(crop => crop.ratio === '1:1') ||
        images.crops.find(crop => crop.ratio === '*')
      : undefined;

  const onClick = (event: MouseEventType) => {
    const articleForTracking = { headline, id, url };
    articleClickTracking(event, articleForTracking, clickHandler);
  };
  return (
    <CardComposable
      columnGap="space040"
      columns={{
        xs: '77px 1fr',
        md: isCommentBucket1 ? '1fr' : '77px 1fr',
        lg: '77px 1fr'
      }}
      areas={{
        xs: `
             media content
            `,
        md: isCommentBucket1
          ? `media 
             content`
          : `
             media content
            `,
        lg: `
            media content
            `
      }}
      justifyItems={{
        md: isCommentBucket1 ? 'center' : 'start'
      }}
    >
      {imageWithCorrectRatio && (
        <GridLayoutItem area="media">
          <a href={url} onClick={onClick}>
            <Image
              src={`${imageWithCorrectRatio.url}&resize=750`}
              alt={(images && images.alt) || byline}
              loadingAspectRatio={imageWithCorrectRatio.ratio}
              width="77px"
              loading="lazy"
              overrides={{
                stylePreset: 'imageCircle',
                marginBlockEnd: {
                  md: isCommentBucket1 ? 'space040' : 'space000',
                  lg: 'space000'
                }
              }}
            />
          </a>
        </GridLayoutItem>
      )}

      <CardContent
        rowGap="space030"
        alignContent="start"
        justifyItems={{
          md: isCommentBucket1 ? 'center' : 'start',
          lg: 'start'
        }}
      >
        <CardHeadlineLink
          href={url}
          $color={
            theme.name === 'times-web-light' ? 'inkBrand010' : 'sectionBrand050'
          }
          overrides={{ typographyPreset: 'editorialHeadline010' }}
          external={false}
          onClick={onClick}
        >
          {byline}
        </CardHeadlineLink>
        <CardHeadlineLink
          href={url}
          overrides={{ typographyPreset: 'editorialRegularHeadline020' }}
          $color="sectionBrand080"
          external={false}
          onClick={onClick}
          tabIndex={0}
          isCommentBucket1={isCommentBucket1}
        >
          {headline}
        </CardHeadlineLink>
        <Block marginBlockStart="space010">
          {flag && (
            <TagAndFlag
              flag={flag}
              flagOverrides={{
                typographyPreset: 'utilityMeta005',
                stylePreset: 'inkSubtle'
              }}
            />
          )}
        </Block>
      </CardContent>
    </CardComposable>
  );
};
