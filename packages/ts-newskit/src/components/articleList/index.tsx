import React from 'react';
import {
    Block,
    Image,
    LinkStandalone,
    Headline
} from 'newskit';
import { ArticleList, ArticleListFooter, TimeToRead } from './styles';
import './articleList.css';

interface ArticleListItemProps {
    image?: string;
    alt?: string;
    title: string;
    url: string;
    articleType?: string;
    timeToRead?: string;
};

export const ArticleListItem = ({ title,timeToRead,articleType,image,url }: ArticleListItemProps) => {
    return (
        <ArticleList>
            <LinkStandalone href={url}>
                <Block as="section">
                    <Image
                        src={image}
                        alt=""
                        loadingAspectRatio="3:2"
                        width="100%"
                        overrides={{
                            marginBlock: '0 10px',
                        }}
                    />
                    <Headline
                        headingAs="h3"
                        overrides={{
                            typographyPreset: 'articleListTitle'
                        }}>
                        {title}
                    </Headline>
                    <ArticleListFooter>
                        <span className={"articleListType__" + articleType}>{articleType}</span>
                        <TimeToRead>{timeToRead}</TimeToRead>
                    </ArticleListFooter>
                </Block>
            </LinkStandalone>
        </ArticleList>
    );
};
