import React from 'react';
import get from 'lodash.get';

import { SliceData } from '../../../types/slice';
import { SliceStyle } from '../../../types/styles';
import { ClickHandlerType } from '../../../types/event';
import { setDisplaySchema } from '../../../utils/getArticleStyles';

import { Article } from '../../article/Article/Article';

import { SliceContainer } from '../shared-styles';
import {
  StackedColumn,
  SideBySideColumn,
  SlotContainerLead,
  SlotContainer
} from './styles';

const Lead1And3Reversed: React.FC<{
  slice: SliceData;
  styles?: SliceStyle;
  clickHandler?: ClickHandlerType;
}> = React.memo(({ slice, styles, clickHandler }) => (
  <SliceContainer styles={styles}>
    <StackedColumn styles={styles}>
      <SideBySideColumn>
        {[...Array(2)].fill(null).map((__, i) => (
          <SlotContainer key={i} styles={styles}>
            <Article
              article={get(slice, `children[${i}].article`)}
              displaySchema={setDisplaySchema({
                sm: { imageRatio: '3:2', headlineFontSize: 18 },
                md: { imageRatio: '16:9' },
                lg: { headlineFontSize: 22 },
                xlg: { headlineFontSize: 24 }
              })}
              clickHandler={clickHandler}
            />
          </SlotContainer>
        ))}
      </SideBySideColumn>

      <Article
        article={get(slice, 'children[2].article')}
        displaySchema={setDisplaySchema({
          sm: {
            isSideBySide: true,
            sideBySidePadding: 12,
            imageRatio: '3:2',
            headlineFontSize: 18
          },
          md: { imageRatio: '16:9', headlineFontSize: 22 },
          lg: { headlineFontSize: 24 }
        })}
        clickHandler={clickHandler}
      />
    </StackedColumn>

    <SlotContainerLead styles={styles}>
      <Article
        article={get(slice, 'children[3].article')}
        displaySchema={setDisplaySchema({
          sm: { imageRatio: '3:2', headlineFontSize: 22 },
          md: { headlineFontSize: 24 },
          xlg: { headlineFontSize: 28 }
        })}
        clickHandler={clickHandler}
      />
    </SlotContainerLead>
  </SliceContainer>
));

export default Lead1And3Reversed;
