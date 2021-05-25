import React from 'react';
import get from 'lodash.get';

import { SliceData } from '../../../types/slice';
import { SliceStyle } from '../../../types/styles';
import { ClickHandlerType } from '../../../types/event';
import { setDisplaySchema } from '../../../utils/getArticleStyles';

import { Article } from '../../article/Article/Article';

import { SliceContainer, SlotContainer } from './styles';

const Lead1: React.FC<{
  slice: SliceData;
  styles?: SliceStyle;
  clickHandler?: ClickHandlerType;
}> = React.memo(({ slice, styles, clickHandler }) => (
  <SliceContainer styles={styles}>
    <SlotContainer styles={styles}>
      <Article
        article={get(slice, 'children[0].article')}
        displaySchema={setDisplaySchema({
          sm: {
            imageRatio: '3:2',
            isCentered: true,
            headlineFontSize: 28,
            backgroundColor: '#f0f0f0'
          },
          md: { isSideBySide: true },
          lg: { headlineFontSize: 32 },
          xlg: { headlineFontSize: 36 }
        })}
        clickHandler={clickHandler}
      />
    </SlotContainer>
  </SliceContainer>
));

export default Lead1;
