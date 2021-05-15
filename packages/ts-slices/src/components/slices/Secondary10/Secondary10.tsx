import React from 'react';
import get from 'lodash.get';

import { SliceData, SliceSlot } from '../../../types/slice';
import { SliceStyle } from '../../../types/styles';
import { ClickHandlerType } from '../../../types/event';
import { setDisplaySchema } from '../../../utils/getArticleStyles';

import { Article } from '../../article/Article/Article';

import { SliceContainer } from '../shared-styles';
import { SlotContainer } from './styles';

const Secondary10: React.FC<{
  slice: SliceData;
  styles?: SliceStyle;
  clickHandler?: ClickHandlerType;
}> = React.memo(({ slice, styles, clickHandler }) => (
  <SliceContainer styles={styles}>
    {slice.children.map((slot: SliceSlot, i: number) => (
      <SlotContainer key={i} styles={styles}>
        <Article
          article={get(slot, 'article')}
          displaySchema={setDisplaySchema({
            sm: {
              imageRatio: '3:2',
              headlineFontSize: 18,
              isCentered: true
            },
            lg: { headlineFontSize: 22 },
            xlg: { headlineFontSize: 24 }
          })}
          clickHandler={clickHandler}
        />
      </SlotContainer>
    ))}
  </SliceContainer>
));

export default Secondary10;
