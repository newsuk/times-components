import {
  TextBlock,
  Block,
  CardContent,
  CardComposable,
  Divider,
  MQ
} from 'newskit';
import React from 'react';
import {
  CardHeadlineLink,
  FullWidthCardMediaMob,
  StyledSpan
} from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';
import { UnorderedListItems } from './unorderedList';
import { ClickHandlerType, MouseEventType } from '../../../slices/types';
import { articleClickTracking } from '../../../utils/tracking';
import {
  ArticleTileInfo,
  expirableFlagsProps
} from '../shared/articleTileInfo';

const styles = {
  wrapper: {
    display: "table",
    height: 0,
    overflow: "hidden",
    position: "relative",
    width: "100%"
  },
  img: {
    opacity: 1,
    zIndex: 2,
    width: "100%",
    position: "absolute",
    display: "block"
  }
};

type ImageCrops = {
  url?: string;
  ratio?: string;
};
type ListData = {
  label: string;
  href: string;
  id: string;
};

type ImageProps = {
  alt?: string;
  caption?: string;
  credits?: string;
  crops?: ImageCrops[];
};
export interface LeadArticleProps {
  id: string;
  headline: string;
  flag?: string;
  shortSummary?: string;
  contentType?: string;
  label?: string;
  expirableFlags?: expirableFlagsProps[];
  images?: ImageProps;
  url: string;
  tag?: {
    label: string;
    href: string;
  };
  imageTop?: boolean;
  hasTopBorder?: boolean;
  contentTop?: boolean;
  contentWidth?: string;
  headlineTypographyPreset?: MQ<string> | string;
  loadingAspectRatio?: string;
  imageMarginBlockStart?: string;
  textBlockMarginBlockStart?: string;
  tagAndFlagMarginBlockStart?: string;
  listData?: ListData[];
  hideImage?: boolean;
}

export const LeadArticle = ({
  article,
  clickHandler
}: {
  article: LeadArticleProps;
  clickHandler: ClickHandlerType;
}) => {
  const {
    id,
    headline,
    flag,
    shortSummary,
    contentType,
    images,
    url,
    tag,
    imageTop,
    hasTopBorder = true,
    contentTop,
    contentWidth,
    headlineTypographyPreset,
    loadingAspectRatio,
    imageMarginBlockStart = 'space000',
    textBlockMarginBlockStart = 'space040',
    tagAndFlagMarginBlockStart = 'space040',
    listData,
    hideImage,
    expirableFlags,
    label
  } = article;
  const imageWithCorrectRatio =
    images && images.crops
      ? images.crops.find(crop => crop.ratio === loadingAspectRatio) ||
        images.crops.find(crop => crop.ratio === '3:2')
      : null;

  const cardImage = images &&
    imageWithCorrectRatio &&
    imageWithCorrectRatio.url !== '' && {
      media: {
        src: imageWithCorrectRatio.url,
        alt: (images && images.alt) || headline,
        loadingAspectRatio: imageWithCorrectRatio.ratio,
      }
    };


    console.log(cardImage, 'CARD IMAGE')
  const hasImage =
    images &&
    images.crops &&
    images.crops.length > 0 &&
    imageWithCorrectRatio &&
    imageWithCorrectRatio.url !== '';

  const hasCaption = !!(images && images.caption);
  const hasCredits = !!(images && images.credits);

  const hasCaptionOrCredits = hasCaption || hasCredits;

  const headlineTypography = headlineTypographyPreset
    ? headlineTypographyPreset
    : imageTop
      ? { xs: 'editorialHeadline040', md: 'editorialHeadline030' }
      : 'editorialHeadline040';
  const displayArticleVertical = imageTop || hideImage;

  const onClick = (event: MouseEventType) => {
    const articleForTracking = { headline, id, url };
    articleClickTracking(event, articleForTracking, clickHandler);
  };
  const getRatio = (ratioString: string) => {
    const [ratioWidth, ratioHeight] = ratioString.split(":");
  
    return Number(ratioWidth) / Number(ratioHeight);
  };

  return (
    <CardComposable
      areas={{
        xs: displayArticleVertical
          ? `media
             content`
          : `content 
             media`,
        md: displayArticleVertical
          ? `media 
             content`
          : `content media`
      }}
      columnGap="space040"
      columns={{
        md: displayArticleVertical ? '100%' : `${contentWidth || '260px'} auto`
      }}
    >
      {hasImage &&
        !hideImage && (
          <Block
            marginBlockEnd={imageTop ? 'space040' : 'space000'}
            marginBlockStart={imageMarginBlockStart}
          >
            {/* Simplify the styling here to just paddingBottom becoming height and width 100%. Probs don\t need the rest - Ask Adam. */}
            <div style={{ ...styles.wrapper, paddingBottom: `${100 / getRatio(cardImage.media.loadingAspectRatio)}%` }}
      className="lcpItem">
            <FullWidthCardMediaMob {...cardImage} />
            </div>
            {hasCaptionOrCredits && (
              <TextBlock
                marginBlockStart="space020"
                typographyPreset="editorialCaption010"
                stylePreset="inkSubtle"
              >
                {images && images.caption}
                {images &&
                  images.credits && (
                    <StyledSpan hasCaption={hasCaption}>
                      {images.credits}
                    </StyledSpan>
                  )}
              </TextBlock>
            )}
          </Block>
        )}

      <CardContent
        alignContent="start"
        overrides={{ marginBlockEnd: contentTop ? 'space040' : 'space000' }}
      >
        {hasTopBorder && (
          <Divider
            overrides={{
              stylePreset: 'dashedDivider',
              marginBlockEnd: 'space045'
            }}
          />
        )}
        <ArticleTileInfo
          contentType={contentType}
          expirableFlags={expirableFlags}
          label={label}
          marginBlockEnd="space030"
        />
        <CardHeadlineLink
          href={url}
          overrides={{
            typographyPreset: headlineTypography
          }}
          external={false}
          expand={!tag}
          onClick={onClick}
        >
          {headline}
        </CardHeadlineLink>
        {shortSummary && (
          <TextBlock
            typographyPreset={{
              xs: 'editorialParagraph020',
              md: 'editorialParagraph010'
            }}
            marginBlockStart={textBlockMarginBlockStart}
            as="p"
          >
            {shortSummary}
          </TextBlock>
        )}
        <TagAndFlag
          tag={tag}
          flag={flag}
          marginBlockStart={tagAndFlagMarginBlockStart}
        />
        <UnorderedListItems listData={listData} clickHandler={clickHandler} />
      </CardContent>
    </CardComposable>
  );
};
