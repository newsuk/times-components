import React from 'react';
import {
  Divider,
  CardContent,
  Block,
  TextBlock,
  CardComposable,
  CardMedia,
  GridLayoutItem
} from 'newskit';
import {
  CardHeadlineLink,
  FullWidthCardMediaMob,
  FullWidthBlock
} from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';
import { ClickHandlerType } from '../../../slices/types';

type ImageCrops = {
  url?: string;
  ratio?: string;
};

type ImageProps = {
  alt?: string;
  caption?: string;
  crops?: ImageCrops[];
};

export interface ArticleProps {
  id: string;
  headline: string;
  url: string;
  images?: ImageProps;
  tag?: {
    label: string;
    href: string;
  };
  flag?: string;
  hasTopBorder?: boolean;
  hideImage?: boolean;
  isLeadImage?: boolean;
  imageRight?: boolean;
  isFullWidth?: boolean;
  articleTitleMarginTop?: string;
  titleTypographyPreset?: string;
  tagAndFlagMarginBlockStart?: string;
  clickHandler: ClickHandlerType
}

type LayoutProps = {
  imageRight: boolean;
};

type MouseEventType = React.MouseEvent<HTMLAnchorElement, MouseEvent>;

export const Article = ({
  id,
  images,
  headline,
  url,
  tag,
  flag,
  hasTopBorder,
  hideImage,
  isLeadImage,
  imageRight,
  isFullWidth,
  articleTitleMarginTop = 'space040',
  titleTypographyPreset = 'editorialHeadline020',
  tagAndFlagMarginBlockStart = 'space040',
  clickHandler
}: ArticleProps) => {
  const imageWithCorrectRatio =
    images && images.crops && images.crops.find(crop => crop.ratio === '3:2');

  const cardImage = !hideImage &&
    imageWithCorrectRatio && {
      media: {
        src: imageWithCorrectRatio.url,
        alt: (images && images.alt) || headline,
        loadingAspectRatio: imageWithCorrectRatio.ratio || '3:2'
      }
    };

  const CardMediaComponent = isLeadImage ? FullWidthCardMediaMob : CardMedia;
  const titleMarginBlockStart =
    imageRight || hideImage ? 'space000' : articleTitleMarginTop;

  const hasImage =
    images &&
    images.crops &&
    images.crops.length > 0 &&
    imageWithCorrectRatio &&
    imageWithCorrectRatio.url !== '';

  const Layout: React.FC<LayoutProps> = ({ children }) => {
    return imageRight ? <Block>{children}</Block> : <>{children}</>;
  };

  const onClick = (event: MouseEventType) => {
    const article = { headline, id }
    console.log('HELLOOOOO');
    console.log(article, 'ARTICLE')
    event.preventDefault();

    if (article && clickHandler) {
        clickHandler(event, article);
    }
    // location.href is required instead of <a href={} />
    // this is a side effect caused by transformChannelData
    // changing article urls client-side causes hydration warning
    
    location.href = url;
};

  return (
    <CardComposable
      alignContent="start"
      areas={
        imageRight
          ? `
          border  border
          content media`
          : `border
         media
         content
        `
      }
      columns={{ xl: imageRight ? '1fr 1fr' : '1fr' }}
      columnGap="space040"
    >
      {hasTopBorder && (
        <GridLayoutItem area="border">
          {isFullWidth ? (
            <FullWidthBlock>
              <Divider
                overrides={{
                  marginBlockEnd: 'space040',
                  stylePreset: 'dashedDivider'
                }}
              />
            </FullWidthBlock>
          ) : (
            <Divider
              overrides={{
                marginBlockEnd: 'space040',
                stylePreset: 'dashedDivider'
              }}
            />
          )}
        </GridLayoutItem>
      )}

      {hasImage && !hideImage && <CardMediaComponent {...cardImage} />}
      <CardContent>
        {images &&
          !imageRight &&
          images.caption &&
          !hideImage && (
            <TextBlock
              marginBlockStart="space020"
              stylePreset="inkSubtle"
              typographyPreset="utilityMeta010"
            >
              {images.caption}
            </TextBlock>
          )}
        <Layout imageRight={imageRight || false}>
          <CardHeadlineLink
            href={url}
            role="link"
            overrides={{
              typographyPreset: titleTypographyPreset,
              marginBlockStart: titleMarginBlockStart
            }}
            external={false}
            onClick={onClick}
          >
            {headline}
          </CardHeadlineLink>
          <TagAndFlag
            tag={tag}
            flag={flag}
            marginBlockStart={tagAndFlagMarginBlockStart}
          />
        </Layout>
      </CardContent>
    </CardComposable>
  );
};
