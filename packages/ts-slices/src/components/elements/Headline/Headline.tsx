import React from 'react';

import { SliceArticle } from '../../../types/slice';
import { MouseEventType, ClickHandlerType } from '../../../types/event';
import { DisplaySchema } from '../../../types/styles';

import { HeadlineContainer } from './styles';
import { TimesWebLightSportTheme } from '@times-components/ts-newskit';
import { getThemeValue } from '../../../utils/getThemeValue';

export const Headline: React.FC<{
  article: SliceArticle;
  displaySchema?: DisplaySchema;
  clickHandler?: ClickHandlerType;
  slug?: string;
}> = ({ article, displaySchema, clickHandler, slug }) => {
  if (!article.headline) {
    return null;
  }

  const onClick = (event: MouseEventType) => {
    if (article && clickHandler) {
      clickHandler(event, article);
    }
  };

  return (
    <HeadlineContainer
      schema={displaySchema}
      color={
        slug === 'sport'
          ? getThemeValue(TimesWebLightSportTheme.colors, 'sport070')
          : undefined
      }
    >
      <a onClick={onClick} href={article.url}>
        <h3>{article.headline}</h3>
      </a>
    </HeadlineContainer>
  );
};
