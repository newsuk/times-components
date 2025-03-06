import React from 'react';
import { storiesOf } from '@storybook/react';
import { date } from '@storybook/addon-knobs';
import {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag,
  LongReadArticleFlag,
  ArticleFlags
} from './ArticleFlag';
import { LiveArticleFlag, BreakingArticleFlag } from './LiveArticleFlag';
import { UpdatedTimeProvider } from '../../helpers/time/UpdatedTimeProvider';

storiesOf('Typescript Component/Article Flag', module)
  .add('Article Flag (New)', () => <NewArticleFlag />)
  .add('Article Flag (Live)', () => {
    const label = 'Updated Date/Time';
    const defaultValue = new Date();
    const groupId = 'Options';
    const value = date(label, defaultValue, groupId);
    const updated = new Date(value).toISOString();

    return (
      <UpdatedTimeProvider updatedTime={updated}>
        <LiveArticleFlag />
      </UpdatedTimeProvider>
    );
  })
  .add('Article Flag (Breaking)', () => {
    const label = 'Updated Date/Time';
    const defaultValue = new Date();
    const groupId = 'Options';
    const value = date(label, defaultValue, groupId);
    const updated = new Date(value).toISOString();

    return (
      <UpdatedTimeProvider updatedTime={updated}>
        <BreakingArticleFlag />
      </UpdatedTimeProvider>
    );
  })
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
