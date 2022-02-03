import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag,
  LongReadArticleFlag,
  ArticleFlags
} from './ArticleFlag';
import { LiveArticleFlag, BreakingArticleFlag } from './LiveArticleFlag';

storiesOf('Typescript Component/Article Flag', module)
  .add('Article Flag (New)', () => <NewArticleFlag />)
  .add('Article Flag (Live)', () => <LiveArticleFlag />)
  .add('Article Flag (Breaking)', () => <BreakingArticleFlag />)
  .add('Article Flag (Updated)', () => <UpdatedArticleFlag />)
  .add('Article Flag (Exclusive)', () => <ExclusiveArticleFlag />)
  .add('Article Flag (Sponsored)', () => <SponsoredArticleFlag />)
  .add('Article Flag (Long Read)', () => <LongReadArticleFlag />)
  .add('Article Flags', () => (
    <ArticleFlags
      flags={[
        { expiryTime: '2030-03-13T12:00:00.000Z', type: 'LIVE' },
        { expiryTime: '2030-03-13T12:00:00.000Z', type: 'BREAKING' },
        { expiryTime: '2030-03-13T12:00:00.000Z', type: 'UPDATED' },
        { expiryTime: '2030-03-14T12:00:00.000Z', type: 'EXCLUSIVE' },
        { expiryTime: '2030-03-14T12:00:00.000Z', type: 'NEW' },
        { expiryTime: '2030-03-14T12:00:00.000Z', type: 'SPONSORED' }
      ]}
      longRead
      withContainer={false}
    />
  ))
  .add('Article Flags with Container', () => (
    <ArticleFlags
      flags={[
        { expiryTime: '2030-03-13T12:00:00.000Z', type: 'LIVE' },
        { expiryTime: '2030-03-13T12:00:00.000Z', type: 'BREAKING' },
        { expiryTime: '2030-03-13T12:00:00.000Z', type: 'UPDATED' },
        { expiryTime: '2030-03-14T12:00:00.000Z', type: 'EXCLUSIVE' },
        { expiryTime: '2030-03-14T12:00:00.000Z', type: 'NEW' },
        { expiryTime: '2030-03-14T12:00:00.000Z', type: 'SPONSORED' }
      ]}
      longRead
      withContainer
    />
  ));
