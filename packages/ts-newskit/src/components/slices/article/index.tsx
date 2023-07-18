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

type ImageCrops = {
  url?: string;
  ratio?: string;
};

type ImageProps = {
  alt?: string;
  credit?: string;
  crops?: ImageCrops[];
};

export interface ArticleProps {
  headline: string;
  url: string;
  image?: ImageProps;
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
}

type LayoutProps = {
  imageRight: boolean;
};

export const Article = ({
  image,
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
  tagAndFlagMarginBlockStart = 'space040'
}: ArticleProps) => {
  const imageWithCorrectRatio =
    image && image.crops && image.crops.find(crop => crop.ratio === '3:2');

  const cardImage = !hideImage &&
    imageWithCorrectRatio && {
      media: {
        src: imageWithCorrectRatio.url,
        alt: (image && image.alt) || headline,
        loadingAspectRatio: imageWithCorrectRatio.ratio || '3:2'
      }
    };

  const CardMediaComponent = isLeadImage ? FullWidthCardMediaMob : CardMedia;
  const titleMarginBlockStart =
    imageRight || hideImage ? 'space000' : articleTitleMarginTop;

  const hasImage =
    image &&
    image.crops &&
    image.crops.length > 0 &&
    imageWithCorrectRatio &&
    imageWithCorrectRatio.url !== '';

  const Layout: React.FC<LayoutProps> = ({ children }) => {
    return imageRight ? <Block>{children}</Block> : <>{children}</>;
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
        {image &&
          !imageRight &&
          image.credit &&
          image.credit !== '' &&
          !hideImage && (
            <TextBlock
              marginBlockStart="space020"
              stylePreset="inkSubtle"
              typographyPreset="utilityMeta010"
            >
              {image && image.credit}
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
