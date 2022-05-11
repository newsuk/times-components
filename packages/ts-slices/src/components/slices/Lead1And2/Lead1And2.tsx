import React from 'react';
import get from 'lodash.get';

import { SliceData } from '../../../types/slice';
import { SliceStyle } from '../../../types/styles';
import { ClickHandlerType } from '../../../types/event';
import { setDisplaySchema } from '../../../utils/getArticleStyles';
import { isCommentArticle } from '../../../utils/isCommentArticle';

import { Article } from '../../article/Article/Article';
import { ArticleComment } from '../../article/ArticleComment/ArticleComment';

import { SlotContainer } from '../shared-styles';
import { SliceContainer, SlotContainerLead, StackedColumn } from './styles';

const Lead1And2: React.FC<{
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

    <StackedColumn styles={styles}>
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

      {isCommentArticle(get(slice, 'children[2].article')) ? (
        <ArticleComment
          article={slice.children[2].article}
          displaySchema={setDisplaySchema({
            sm: {
              isSideBySide: true,
              sideBySideWidth: '35%',
              imageRatio: '1:1',
              headlineFontSize: 18
            },
            md: { headlineFontSize: 16 },
            lg: { sideBySideWidth: '50%' },
            xlg: { headlineFontSize: 18 }
          })}
          clickHandler={clickHandler}
        />
      ) : (
        <Article
          article={get(slice, 'children[2].article')}
          displaySchema={setDisplaySchema({
            sm: {
              isSideBySide: true,
              imageRatio: '3:2',
              headlineFontSize: 18
            },
            md: { headlineFontSize: 16 },
            xlg: { headlineFontSize: 18 }
          })}
          clickHandler={clickHandler}
        />
      )}
    </StackedColumn>
  </SliceContainer>
));

export default Lead1And2;
