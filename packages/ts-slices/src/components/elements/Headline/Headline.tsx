import React from 'react';

import { SliceArticle } from '../../../types/slice';
import { MouseEventType, ClickHandlerType } from '../../../types/event';
import { DisplaySchema } from '../../../types/styles';

import { HeadlineContainer } from './styles';

export const Headline: React.FC<{
  article: SliceArticle;
  displaySchema?: DisplaySchema;
  clickHandler?: ClickHandlerType;
}> = ({ article, displaySchema, clickHandler }) => {
  if (!article.headline) {
    return null;
  }

  const onClick = (event: MouseEventType) => {
    if (article && clickHandler) {
      clickHandler(event, article);
    }
  };

  return (
    <HeadlineContainer schema={displaySchema}>
      <a onClick={onClick} href={article.url}>
        <h3>{article.headline}</h3>
      </a>
    </HeadlineContainer>
  );
};
