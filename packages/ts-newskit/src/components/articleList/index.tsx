import React from 'react';
import {
    Block,
    Image,
    LinkStandalone,
    Headline
} from 'newskit';
import { ArticleList } from './styles';

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
        {data.map((articleListItem, articleListIndex, articleListArr) => (
            <LinkStandalone
                href={articleListItem.url}
                overrides={{
                    typographyPreset: 'articleListTitle'
                }}>
                <Block as="section">
                    <Image
                        src={articleListItem.image}
                        alt={
                            articleListIndex + 1 === articleListArr.length
                            ? undefined
                            : articleListItem.alt
                        }
                        loadingAspectRatio="3:2"
                        width="186px"
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
                    <div>{articleListItem.articleType} | {articleListItem.timeToRead}</div>
                </Block>
            </LinkStandalone>
        ))}
    </ArticleList>
    );
};
