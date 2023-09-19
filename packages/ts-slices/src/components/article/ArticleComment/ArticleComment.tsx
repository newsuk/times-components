import React from 'react';

import { SliceArticle } from '../../../types/slice';
import { ClickHandlerType } from '../../../types/event';
import { DisplaySchema } from '../../../types/styles';

import { Image } from '../../elements/Image/Image';
import { Headline } from '../../elements/Headline/Headline';

import { SideBySideColumn, Label } from '../shared-styles';
import { ArticleContainer, ImageContainer, Byline } from './styles';
import { TimesWebLightSportTheme } from '@times-components/ts-newskit';
import { getThemeValue } from '../../../utils/getThemeValue';

export const ArticleComment: React.FC<{
  article?: SliceArticle;
  displaySchema?: DisplaySchema;
  clickHandler?: ClickHandlerType;
  slug?: string;
}> = ({ article, displaySchema, clickHandler, slug }) => {
  if (!article) {
    return null;
  }

  return (
    <ArticleContainer schema={displaySchema}>
      <SideBySideColumn schema={displaySchema}>
        <ImageContainer
          backgroundColor={
            slug === 'sport'
              ? getThemeValue(TimesWebLightSportTheme.colors, 'interface030')
              : undefined
          }
        >
          <Image
            article={article}
            displaySchema={displaySchema}
            clickHandler={clickHandler}
          />
        </ImageContainer>
      </SideBySideColumn>
      <SideBySideColumn schema={displaySchema}>
        {article.label && <Label>{article.label}</Label>}
        {article.byline && (
          <Byline
            color={
              slug === 'sport'
                ? getThemeValue(TimesWebLightSportTheme.colors, 'sport050')
                : undefined
            }
            marginBlockEnd={
              slug === 'sport'
                ? getThemeValue(
                    TimesWebLightSportTheme.spacePresets,
                    'space030'
                  )
                : undefined
            }
          >
            {article.byline}
          </Byline>
        )}
        <Headline
          article={article}
          displaySchema={displaySchema}
          clickHandler={clickHandler}
          slug={slug}
        />
      </SideBySideColumn>
    </ArticleContainer>
  );
};
