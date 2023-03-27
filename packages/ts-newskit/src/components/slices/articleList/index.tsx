import React from 'react';
import {
  Block,
  Image,
  LinkStandalone,
  Headline,
  Stack,
  Hidden,
  TextBlock,
  Divider
} from 'newskit';
import { ArticleListType, ContainerInline } from './styles';
export interface ArticleListItemProps {
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
          <Hidden lg>
            <Image
              src={image}
              data-testid="article-ListItemImg"
              alt={alt || title}
              loadingAspectRatio="3:2"
              width="100%"
              overrides={{
                marginBlockEnd: 'space020'
              }}
            />
          </Hidden>
          <Headline
            headingAs="h3"
            overrides={{
              marginBlock: 'space020',
              typographyPreset: 'articleListTitle'
            }}
          >
            {title}
          </Headline>
          <Block>
            <ArticleListType
              typographyPreset="articleListArticleType"
              as="span"
              $color={color}
            >
              {articleType}
            </ArticleListType>
            {articleType && timeToRead ? (
              <ContainerInline>
                <Divider
                  vertical
                  overrides={{
                    marginInline: 'space020'
                  }}
                />
              </ContainerInline>
            ) : null}
            <TextBlock
              typographyPreset="articleListTimeToRead"
              stylePreset="articleListTimeToRead"
              as="span"
            >
              {timeToRead}
            </TextBlock>
          </Block>
        </Block>
      </LinkStandalone>
    </Stack>
  );
};
