import React from 'react';
import get from 'lodash.get';

import { SliceArticle } from '../../../types/slice';
import { MouseEventType, ClickHandlerType } from '../../../types/event';
import { DisplaySchema } from '../../../types/styles';
import { getImageRatioSchema } from '../../../utils/getArticleStyles';
import { getImageByRatio, getImageAltText } from '../../../utils/getImage';

import { LazyImage } from './LazyImage/LazyImage';

import { ImageContainer, ImageRatio } from './styles';

export const Image: React.FC<{
  article: SliceArticle;
  displaySchema?: DisplaySchema;
  clickHandler?: ClickHandlerType;
}> = ({ article, displaySchema, clickHandler }) => {
  const ratioSchema = getImageRatioSchema(displaySchema);

  const onClick = (event: MouseEventType) => {
    if (article && clickHandler) {
      clickHandler(event, article);
    }
  };

  return (
    <ImageContainer schema={displaySchema}>
      <a onClick={onClick} href={article.url}>
        {Object.entries(ratioSchema).map(([ratio, schema], i: number) => {
          const image = getImageByRatio(ratio, article);

          return (
            <ImageRatio key={i} ratio={ratio} schema={schema}>
              <LazyImage
                url={get(image, 'url')}
                alt={getImageAltText(article)}
                isRoundal={ratio === '1:1'}
                isBackground={get(image, 'ratio') === '*'}
              />
            </ImageRatio>
          );
        })}
      </a>
    </ImageContainer>
  );
};
