import React from 'react';
import {
    Block,
    Image,
    LinkStandalone,
    Headline
} from 'newskit';
import { ArticleList, ArticleListFooter } from './styles';

export type ArticleListItem = {
    image?: string;
    alt?: string;
    title: string;
    url: string;
    articleType?: string;
    timeToRead?: string;
};

export const ArticleListItem: React.FC<{ data: ArticleListItem[]; }> = ({ data }) => {
    return (
    <ArticleList>
        {data.map((articleListItem) => (
            <LinkStandalone
                href={articleListItem.url}
                overrides={{
                    typographyPreset: 'articleListLink'
                }}>
                <Block as="section">
                    <Image
                        src={articleListItem.image}
                        alt=""
                        loadingAspectRatio="3:2"
                        width="100%"
                        overrides={{
                            stylePreset: 'imageSharp'
                        }}
                    />
                    <Headline
                        headingAs="h3"
                        overrides={{
                            heading: {
                                stylePreset: 'articleList'
                            },
                            typographyPreset: 'articleListTitle'
                        }}>
                        {articleListItem.title}
                    </Headline>
                    <ArticleListFooter>{articleListItem.articleType} | {articleListItem.timeToRead}</ArticleListFooter>
                </Block>
            </LinkStandalone>
        ))}
    </ArticleList>
    );
};
