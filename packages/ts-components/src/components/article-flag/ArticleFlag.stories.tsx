import React from 'react';
import { storiesOf } from '@storybook/react';
import { LiveArticleFlag } from "./LiveArticleFlag";
import { NewArticleFlag, UpdatedArticleFlag, ExclusiveArticleFlag, SponsoredArticleFlag, LongReadArticleFlag } from './ArticleFlag';

storiesOf('Typescript Component/Article Flag', module)
    .add('Article Flag (New)', () => (
            <NewArticleFlag/>
    ))
    .add('Article Flag (Live)', () => (
            <LiveArticleFlag/>
    ))
    .add('Article Flag (Exclusive)', () => (
            <ExclusiveArticleFlag/>
    ))
    .add('Article Flag (Updated)', () => (
            <UpdatedArticleFlag/>
    ))
    .add('Article Flag (Sponsored)', () => (
            <SponsoredArticleFlag/>
    ))
    .add('Article Flag (Longread)', () => (
            <LongReadArticleFlag/>
    ))