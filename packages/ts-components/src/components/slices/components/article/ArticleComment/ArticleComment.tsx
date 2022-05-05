import React from 'react';

import { SliceArticle } from '../../../types/slice';
import { ClickHandlerType } from '../../../types/event';
import { DisplaySchema } from '../../../types/styles';

import { Image } from '../../elements/Image/Image';
import { Headline } from '../../elements/Headline/Headline';

import { SideBySideColumn, Label } from '../shared-styles';
import { ArticleContainer, ImageContainer, Byline } from './styles';

export const ArticleComment: React.FC<{
  article?: SliceArticle;
  displaySchema?: DisplaySchema;
  clickHandler?: ClickHandlerType;
}> = ({ article, displaySchema, clickHandler }) => {
  if (!article) {
    return null;
  }

  return (
    <ArticleContainer schema={displaySchema}>
      <SideBySideColumn schema={displaySchema}>
        <ImageContainer>
          <Image
            article={article}
            displaySchema={displaySchema}
            clickHandler={clickHandler}
          />
        </ImageContainer>
      </SideBySideColumn>
      <SideBySideColumn schema={displaySchema}>
        {article.label && <Label>{article.label}</Label>}
        {article.byline && <Byline>{article.byline}</Byline>}
        <Headline
          article={article}
          displaySchema={displaySchema}
          clickHandler={clickHandler}
        />
      </SideBySideColumn>
    </ArticleContainer>
  );
};
