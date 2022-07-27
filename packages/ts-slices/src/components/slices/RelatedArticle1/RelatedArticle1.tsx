import React from 'react';
import get from 'lodash.get';

import { SliceData } from '../../../types/slice';
import { SliceStyle } from '../../../types/styles';
import { ClickHandlerType } from '../../../types/event';
import { setDisplaySchema } from '../../../utils/getArticleStyles';

import { Article } from '../../article/Article/Article';

import { SliceContainer, SlotContainer } from './styles';

const RelatedArticle1: React.FC<{
  slice: SliceData;
  styles?: SliceStyle;
  clickHandler?: ClickHandlerType;
}> = React.memo(({ slice, styles, clickHandler }) => (
  <SliceContainer styles={styles}>
    <SlotContainer styles={styles}>
      <Article
        article={get(slice, 'children[0].article')}
        displaySchema={setDisplaySchema({
          sm: { imageRatio: '16:9', headlineFontSize: 22 },
          md: { isSideBySide: true }
        })}
        clickHandler={clickHandler}
      />
    </SlotContainer>
  </SliceContainer>
));

export default RelatedArticle1;
