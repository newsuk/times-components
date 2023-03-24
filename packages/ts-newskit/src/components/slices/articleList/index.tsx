import React from 'react';
import {
  Block,
  Image,
  LinkStandalone,
  Headline,
  Stack,
  Visible,
  TextBlock
} from 'newskit';
import { ArticleListType, ArticleListFooterWrapper } from './styles';

interface ArticleListItemProps {
  image?: string;
  color: string;
  alt?: string;
  title: string;
  url: string;
  articleType?: string;
  timeToRead?: string;
}

export const ArticleListItem = ({
  image,
  color,
  alt,
  title,
  url,
  articleType,
  timeToRead
}: ArticleListItemProps) => {
  return (
    <Stack>
      <LinkStandalone
        href={url}
        data-testid="article-ListItem"
        overrides={{
          stylePreset: 'articleListLink'
        }}
      >
        <Block as="section">
          <Visible xs sm md xl>
            <Image
              src={image}
              alt={alt || title}
              loadingAspectRatio="3:2"
              width="100%"
              overrides={{
                marginBlockEnd: 'space020'
              }}
            />
          </Visible>
          <Headline
            headingAs="h3"
            overrides={{
              marginBlock: 'space020',
              typographyPreset: 'articleListTitle'
            }}
          >
            {title}
          </Headline>
          <ArticleListFooterWrapper>
            {articleType ? (
              <ArticleListType
                paddingInlineEnd="space020"
                typographyPreset="articleListArticleType"
                as="span"
                $color={color}
              >
                {articleType}
              </ArticleListType>
            ) : null}
            {timeToRead ? (
              <TextBlock
                paddingInline="space020"
                typographyPreset="articleListTimeToRead"
                stylePreset="articleListTimeToRead"
                as="span"
              >
                {timeToRead}
              </TextBlock>
            ) : null}
          </ArticleListFooterWrapper>
        </Block>
      </LinkStandalone>
    </Stack>
  );
};
