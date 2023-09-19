import React from 'react';

import { SliceArticle } from '../../../types/slice';
import { ClickHandlerType } from '../../../types/event';
import { DisplaySchema } from '../../../types/styles';

import { Image } from '../../elements/Image/Image';
import { Headline } from '../../elements/Headline/Headline';

import { SideBySideColumn, Label } from '../shared-styles';
import { ArticleContainer, ImageContainer, Byline } from './styles';
import { TimesWebLightTheme } from '@times-components/ts-newskit';
import { getThemeValue } from '../../../utils/getThemeValue';

export const ArticleComment: React.FC<{
  article?: SliceArticle;
  displaySchema?: DisplaySchema;
  clickHandler?: ClickHandlerType;
  theme?: string;
}> = ({ article, displaySchema, clickHandler, theme }) => {
  if (!article) {
    return null;
  }

  return (
    <ArticleContainer schema={displaySchema}>
      <SideBySideColumn schema={displaySchema}>
        <ImageContainer
          backgroundColor={getThemeValue(
            TimesWebLightTheme.colors,
            `interface030`
          )}
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
            color={getThemeValue(TimesWebLightTheme.colors, `${theme}050`)}
            marginBlockEnd={getThemeValue(
              TimesWebLightTheme.spacePresets,
              'space030'
            )}
          >
            {article.byline}
          </Byline>
        )}
        <Headline
          article={article}
          displaySchema={displaySchema}
          clickHandler={clickHandler}
          theme={theme}
        />
      </SideBySideColumn>
    </ArticleContainer>
  );
};
