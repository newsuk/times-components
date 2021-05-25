import React from 'react';
import get from 'lodash.get';

import { SliceData } from '../../../types/slice';
import { SliceStyle } from '../../../types/styles';
import { ClickHandlerType } from '../../../types/event';
import { setDisplaySchema } from '../../../utils/getArticleStyles';

import { Article } from '../../article/Article/Article';

import {
  SliceContainer,
  SlotContainerLead,
  StackedColumn,
  SlotContainer
} from './styles';

const Secondary2And3NoPic: React.FC<{
  slice: SliceData;
  styles?: SliceStyle;
  clickHandler?: ClickHandlerType;
}> = React.memo(({ slice, styles, clickHandler }) => (
  <SliceContainer styles={styles}>
    {[...Array(2)].fill(null).map((__, i) => (
      <SlotContainerLead key={i} styles={styles}>
        <Article
          article={get(slice, `children[${i}].article`)}
          displaySchema={setDisplaySchema({
            sm: { imageRatio: '3:2', headlineFontSize: 22 },
            xlg: { headlineFontSize: 24 }
          })}
          clickHandler={clickHandler}
        />
      </SlotContainerLead>
    ))}

    <StackedColumn styles={styles}>
      {[...Array(3)].fill(null).map((__, i) => (
        <SlotContainer key={i} styles={styles}>
          <Article
            article={get(slice, `children[${i + 2}].article`)}
            displaySchema={setDisplaySchema({
              sm: { isImageHidden: true, headlineFontSize: 18 },
              lg: { headlineFontSize: 22 },
              xlg: { headlineFontSize: 24 }
            })}
            clickHandler={clickHandler}
          />
        </SlotContainer>
      ))}
    </StackedColumn>
  </SliceContainer>
));

export default Secondary2And3NoPic;
