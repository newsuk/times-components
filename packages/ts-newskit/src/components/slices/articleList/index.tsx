import React from 'react';
import {
  Block,
  Image,
  LinkStandalone,
  Headline,
  Stack,
  TextBlock,
  Divider,
  useTheme
} from 'newskit';
import { ColouredText, ContainerInline } from '../shared-styles';

export interface ArticleListItemProps {
  image?: string;
  color?: string;
  alt?: string;
  title: string;
  url: string;
  articleType?: string;
  timeToRead?: string;
  hasTopBorder?: boolean;
  hideImage?: boolean;
  isLeadImage?: boolean;
}

export const ArticleListItem = ({
  image,
  color,
  alt,
  title,
  url,
  articleType,
  timeToRead,
  hasTopBorder,
  hideImage,
  isLeadImage
}: ArticleListItemProps) => {
  const theme = useTheme();

  return (
    <Stack
      marginInline={
        isLeadImage ? `-${theme.spacePresets.space045}` : 'space000'
      }
    >
      {hasTopBorder && (
        <Divider
          overrides={{ marginBlock: 'space040', stylePreset: 'dashedDivider' }}
        />
      )}
      <LinkStandalone
        href={url}
        data-testid="article-ListItem"
        overrides={{
          stylePreset: 'articleListLink'
        }}
      >
        <Block as="section">
          {!hideImage && (
            <Image
              src={image}
              data-testid="article-ListItemImg"
              alt={alt || title}
              loadingAspectRatio="3:2"
              width="100%"
              overrides={{
                marginBlockEnd: 'space040'
              }}
            />
          )}
          <Headline
            headingAs="h3"
            overrides={{
              typographyPreset: 'articleListTitle',
              marginInline: isLeadImage ? 'space045' : 'space000'
            }}
          >
            {title}
          </Headline>
          <Block marginInline={isLeadImage ? 'space045' : 'space000'}>
            <ColouredText
              typographyPreset="articleListArticleType"
              as="span"
              $color={color}
              marginBlockStart="space030"
            >
              {articleType}
            </ColouredText>
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
        </Block>
      </LinkStandalone>
    </Stack>
  );
};
