import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArticleInstagramEmbed } from './ArticleInstagramEmbed';
import { text } from '@storybook/addon-knobs';

const getAttributes = () => {
  const id = 'Options';
  const url = text('url', 'https://www.instagram.com/p/CzTNyc0oqDD', id);
  return { url };
};

storiesOf('Typescript Component/Article Instagram Embed', module).add(
  'Article Instagram Embed',
  () => {
    const props = getAttributes();
    return <ArticleInstagramEmbed url={props.url} />;
  }
);
