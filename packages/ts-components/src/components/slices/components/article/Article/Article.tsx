import React from 'react';

import { SliceArticle } from '../../../types/slice';
import { ClickHandlerType } from '../../../types/event';
import { DisplaySchema } from '../../../types/styles';
import { getTimeSince } from '../../../utils/getTimeSince';

import { Image } from '../../elements/Image/Image';
import { Headline } from '../../elements/Headline/Headline';

import { ArticleContainer, SideBySideColumn, Label } from '../shared-styles';
import { Strapline, TimeSince, Link } from './styles';

export const Article: React.FC<{
  article?: SliceArticle;
  displaySchema?: DisplaySchema;
  clickHandler?: ClickHandlerType;
}> = ({ article, displaySchema, clickHandler }) => {
  if (!article) {
    return null;
  }

  const strapline = article.standfirst || article.summary;
  const time = getTimeSince(article);

  return (
    <ArticleContainer schema={displaySchema}>
      <SideBySideColumn schema={displaySchema}>
        <Image
          article={article}
          displaySchema={displaySchema}
          clickHandler={clickHandler}
        />
      </SideBySideColumn>
      <SideBySideColumn schema={displaySchema}>
        {article.label && <Label>{article.label}</Label>}
        <Headline
          article={article}
          displaySchema={displaySchema}
          clickHandler={clickHandler}
        />
        {strapline && <Strapline schema={displaySchema}>{strapline}</Strapline>}
        {time && <TimeSince>{time}</TimeSince>}
        {article.cta && (
          <Link>
            <a href={article.url}>{article.cta}</a>
          </Link>
        )}
      </SideBySideColumn>
    </ArticleContainer>
  );
};
