import {
  CardComposable,
  CardContent,
  useTheme,
  Image,
  GridLayoutItem,
  TextBlock
} from 'newskit';
import React from 'react';
import { CardHeadlineLink } from '../shared-styles';
import {
  ClickHandlerType,
  MouseEventType,
  ImageProps
} from '../../../slices/types';
import { articleClickTracking } from '../../../utils/tracking';
import { getForcedExternalContentRatio } from '../../../utils';

export interface CommentArticleProps {
  id: string;
  images?: ImageProps;
  byline: string;
  headline: string;
  subHeadline: string;
  url: string;
  flag?: string;
}

export const CommentArticle = ({
  article,
  clickHandler,
  isCommentLead1
}: {
  article: CommentArticleProps;
  clickHandler: ClickHandlerType;
  isCommentLead1?: boolean;
}) => {
  const theme = useTheme();

  const { id, images, byline, headline, subHeadline, url, flag } = article;
  const imageWithCorrectRatio =
    images &&
    images.crops &&
    (images.crops.find(crop => crop.ratio === '1:1') ||
      images.crops.find(crop => crop.ratio === '*'));

  const onClick = (event: MouseEventType) => {
    const articleForTracking = { headline, id, url };
    articleClickTracking(event, articleForTracking, clickHandler);
  };

  return (
    <CardComposable
      columnGap="space040"
      columns={{
        xs: '1fr',
        md: '268px 1fr',
        lg: '268px 1fr'
      }}
      justifyItems={{
        md: 'start'
      }}
    >
      {imageWithCorrectRatio && (
        <GridLayoutItem area="media">
          <a href={url} onClick={onClick}>
            <Image
              src={`${imageWithCorrectRatio.url}&resize=750`}
              alt={(images && images.alt) || byline}
              loadingAspectRatio={
                // NOTE: This ensures external content image renders - will be removed once CP side resolved
                imageWithCorrectRatio &&
                getForcedExternalContentRatio(imageWithCorrectRatio, '1:1')
                  .ratio
              }
              width="77px"
              loading="lazy"
              overrides={{
                stylePreset: 'imageCircle',
                marginBlockEnd: {
                  xs: 'space040'
                }
              }}
              // NOTE: This ensures external content image renders - will be removed once CP side resolved
              style={{
                marginInline: 'auto',
                aspectRatio:
                  imageWithCorrectRatio &&
                  getForcedExternalContentRatio(imageWithCorrectRatio, '1:1')
                    .aspectRatio
              }}
            />
          </a>

          <CardContent
            // rowGap="space030"
            alignContent="start"
            justifyItems={{
              md: 'center'
            }}
          >
            <CardHeadlineLink
              href={url}
              $color="sectionBrand070"
              overrides={{
                typographyPreset: 'utilityLabel005',
                marginBlockEnd: 'space045'
              }}
              external={false}
              onClick={onClick}
              style={{
                marginInline: 'auto'
              }}
            >
              {byline}
            </CardHeadlineLink>
            <CardHeadlineLink
              href={url}
              overrides={{
                typographyPreset: 'editorialHeadline040',
                stylePreset: 'inkBrand010',
                marginBlockEnd: 'space050'
              }}
              $color="sectionBrand080"
              external={false}
              onClick={onClick}
              tabIndex={0}
              style={{
                marginInline: 'auto'
              }}
              isCommentLead1={isCommentLead1}
            >
              {headline}
            </CardHeadlineLink>
            <CardHeadlineLink
              href={url}
              $color="sectionBrand080"
              external={false}
              onClick={onClick}
              tabIndex={0}
              overrides={{
                marginBlockEnd: { xs: 'space040', md: 'space000' }
              }}
              isCommentLead1={isCommentLead1}
            >
              <TextBlock
                stylePreset={{
                  xs: 'inkBase'
                }}
                typographyPreset={{
                  xs: 'editorialParagraph020',
                  md: 'editorialParagraph010'
                }}
                as="p"
              >
                {subHeadline}
              </TextBlock>
            </CardHeadlineLink>
          </CardContent>
        </GridLayoutItem>
      )}
    </CardComposable>
  );
};
