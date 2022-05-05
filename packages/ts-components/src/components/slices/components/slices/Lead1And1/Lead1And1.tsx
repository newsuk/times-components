import React from 'react';
import get from 'lodash.get';

import { SliceData } from '../../../types/slice';
import { SliceStyle } from '../../../types/styles';
import { ClickHandlerType } from '../../../types/event';
import { setDisplaySchema } from '../../../utils/getArticleStyles';

import { Article } from '../../article/Article/Article';

import { SliceContainer, SlotContainerLead, SlotContainer } from './styles';

const Lead1And1: React.FC<{
  slice: SliceData;
  styles?: SliceStyle;
  clickHandler?: ClickHandlerType;
}> = React.memo(({ slice, styles, clickHandler }) => (
  <SliceContainer styles={styles}>
    <SlotContainerLead styles={styles}>
      <Article
        article={get(slice, 'children[0].article')}
        displaySchema={setDisplaySchema({
          sm: { imageRatio: '3:2', headlineFontSize: 28 },
          md: { imageRatio: '16:9' },
          lg: { headlineFontSize: 32 },
          xlg: { headlineFontSize: 36 }
        })}
        clickHandler={clickHandler}
      />
    </SlotContainerLead>
    <SlotContainer styles={styles}>
      <Article
        article={get(slice, 'children[1].article')}
        displaySchema={setDisplaySchema({
          sm: { imageRatio: '3:2', headlineFontSize: 22 },
          lg: { headlineFontSize: 24 },
          xlg: { headlineFontSize: 28 }
        })}
        clickHandler={clickHandler}
      />
    </SlotContainer>
  </SliceContainer>
));

export default Lead1And1;
