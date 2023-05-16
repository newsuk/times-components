import React from 'react';
import {
  Divider,
  CardContent,
  Block,
  TextBlock,
  CardComposable,
  CardMedia,
  GridLayoutItem,
  useBreakpointKey
} from 'newskit';
import {
  CardHeadlineLink,
  ContainerInline,
  FullWidthCardMediaMob
} from '../shared-styles';

type ImageProps = {
  src: string;
  alt?: string;
  credit?: string;
};

export interface ArticleListItemProps {
  title: string;
  url: string;
  image?: ImageProps;
  articleType?: string;
  timeToRead?: string;
  hasTopBorder?: boolean;
  hideImage?: boolean;
  isLeadImage?: boolean;
  isBucket1?: boolean;
}

type LayoutProps = {
  isBucket1True: boolean;
};

export const ArticleListItem = ({
  image,
  title,
  url,
  articleType,
  timeToRead,
  hasTopBorder,
  hideImage,
  isLeadImage,
  isBucket1
}: ArticleListItemProps) => {
  const breakpointKey = useBreakpointKey();
  const cardImage = !hideImage &&
    image && {
      media: {
        src: image.src,
        alt: image.alt || title,
        loadingAspectRatio: '3:2'
      }
    };

  const isBucket1True = isBucket1 && breakpointKey === 'xl';

  const CardMediaComponent = isLeadImage ? FullWidthCardMediaMob : CardMedia;

  const Layout: React.FC<LayoutProps> = ({ children }) => {
    return isBucket1True ? <Block>{children}</Block> : <>{children}</>;
  };

  return (
    <CardComposable
      alignContent="start"
      areas={
        isBucket1True
          ? `content media`
          : `border
         media
         content
        `
      }
      columns={{ xl: isBucket1True ? '1fr 1fr' : '1fr' }}
      columnGap="space040"
    >
      {hasTopBorder && (
        <GridLayoutItem area="border">
          <Divider
            overrides={{
              marginBlockEnd: hideImage ? 'space000' : 'space040',
              stylePreset: 'dashedDivider'
            }}
          />
        </GridLayoutItem>
      )}

      {image && !hideImage && <CardMediaComponent {...cardImage} />}
      <CardContent>
        {image &&
          !isBucket1True &&
          image.credit &&
          !hideImage && (
            <TextBlock
              paddingBlockStart="space020"
              stylePreset="inkSubtle"
              typographyPreset="utilityMeta010"
            >
              {image.credit}
            </TextBlock>
          )}
        <Layout isBucket1True={isBucket1True || false}>
          <CardHeadlineLink
            href={url}
            role="link"
            overrides={{
              typographyPreset: 'editorialHeadline020',
              paddingBlockStart: isBucket1True ? 'space000' : 'space040'
            }}
          >
            {title}
          </CardHeadlineLink>
          {(articleType || timeToRead) && (
            <Block>
              <TextBlock
                typographyPreset="articleListArticleType"
                as="span"
                marginBlockStart="space030"
              >
                {articleType}
              </TextBlock>
              {articleType &&
                timeToRead && (
                  <ContainerInline>
                    <Divider
                      vertical
                      overrides={{
                        marginInline: 'space020'
                      }}
                    />
                  </ContainerInline>
                )}
              <TextBlock
                typographyPreset="articleListTimeToRead"
                stylePreset="articleListTimeToRead"
                as="span"
                marginBlockStart="space030"
              >
                {timeToRead}
              </TextBlock>
            </Block>
          )}
        </Layout>
      </CardContent>
    </CardComposable>
  );
};
