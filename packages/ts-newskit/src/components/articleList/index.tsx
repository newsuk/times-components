import React from 'react';
import { Block, Image, LinkStandalone, Headline, Visible } from 'newskit';
import {
  ArticleList,
  ArticleListFooter,
  ArticleListType,
  TimeToRead
} from './styles';

interface ArticleListItemProps {
  image?: string;
  color?: string;
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
    <ArticleList>
      <LinkStandalone href={url} data-testid="article-ListItem">
        <Block as="section">
          <Visible xs sm md xl>
            <Image
              src={image}
              alt={alt}
              loadingAspectRatio="3:2"
              width="100%"
              overrides={{
                marginBlock: '0 10px'
              }}
            />
          </Visible>
          <Headline
            headingAs="h3"
            overrides={{
              typographyPreset: 'articleListTitle'
            }}
          >
            {title}
          </Headline>
          <ArticleListFooter>
            <ArticleListType color={color}>{articleType}</ArticleListType>
            <TimeToRead>{timeToRead}</TimeToRead>
          </ArticleListFooter>
        </Block>
      </LinkStandalone>
    </ArticleList>
  );
};
