import React from 'react';

import { SliceData, SliceSlot } from '../../../types/slice';
import { SliceStyle } from '../../../types/styles';
import { ClickHandlerType } from '../../../types/event';
import { setDisplaySchema } from '../../../utils/getArticleStyles';

import { Article } from '../../article/Article/Article';

import { SliceContainer } from '../shared-styles';
import { SlotContainer } from './styles';

const Lead2: React.FC<{
  slice: SliceData;
  styles?: SliceStyle;
  clickHandler?: ClickHandlerType;
}> = React.memo(({ slice, styles, clickHandler }) => (
  <SliceContainer styles={styles}>
    {slice.children.map((slot: SliceSlot, i: number) => (
      <SlotContainer key={i} styles={styles}>
        <Article
          article={slot.article}
          displaySchema={setDisplaySchema({
            sm: { imageRatio: '3:2', headlineFontSize: 22 },
            md: { imageRatio: '16:9', headlineFontSize: 24 },
            xlg: { headlineFontSize: 28 }
          })}
          clickHandler={clickHandler}
        />
      </SlotContainer>
    ))}
  </SliceContainer>
));

export default Lead2;
