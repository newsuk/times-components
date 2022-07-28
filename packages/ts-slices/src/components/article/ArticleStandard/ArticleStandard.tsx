import React from 'react';
import { format } from 'date-fns';

import { SliceArticle } from '../../../types/slice';
import { ClickHandlerType } from '../../../types/event';
import { DisplaySchema } from '../../../types/styles';

import { Image } from '../../elements/Image/Image';
import { Headline } from '../../elements/Headline/Headline';

import { ArticleContainer, SideBySideColumn, Label } from '../shared-styles';
import { DateTime, Byline } from './styles';

export const ArticleStandard: React.FC<{
  article?: SliceArticle;
  displaySchema?: DisplaySchema;
  clickHandler?: ClickHandlerType;
}> = ({ article, displaySchema, clickHandler }) => {
  if (!article) {
    return null;
  }

  const date = article.datePublished
    ? format(new Date(article.datePublished), 'MMMM d yyyy, h.mmaaa')
    : null;

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
        {date && <DateTime>{date}</DateTime>}
        {article.byline && <Byline>{article.byline}</Byline>}
      </SideBySideColumn>
    </ArticleContainer>
  );
};
