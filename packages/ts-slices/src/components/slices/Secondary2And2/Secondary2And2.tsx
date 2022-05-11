import React from 'react';
import get from 'lodash.get';

import { SliceData } from '../../../types/slice';
import { SliceStyle } from '../../../types/styles';
import { ClickHandlerType } from '../../../types/event';
import { setDisplaySchema } from '../../../utils/getArticleStyles';
import { isCommentArticle } from '../../../utils/isCommentArticle';

import { Article } from '../../article/Article/Article';
import { ArticleComment } from '../../article/ArticleComment/ArticleComment';

import {
  SliceContainer,
  SlotContainerLead,
  StackedColumn,
  SlotContainer
} from './styles';

const Secondary2And2: React.FC<{
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
      {[...Array(2)].fill(null).map((__, i) => {
        const article = get(slice, `children[${i + 2}].article`);

        return (
          <SlotContainer key={i} styles={styles}>
            {isCommentArticle(article) ? (
              <ArticleComment
                article={article}
                displaySchema={setDisplaySchema({
                  sm: {
                    isSideBySide: true,
                    sideBySideWidth: '35%',
                    imageRatio: '1:1',
                    headlineFontSize: 18
                  },
                  md: {
                    sideBySideWidth: '50%',
                    headlineFontSize: 16
                  },
                  xlg: { headlineFontSize: 18 }
                })}
                clickHandler={clickHandler}
              />
            ) : (
              <Article
                article={article}
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
          </SlotContainer>
        );
      })}
    </StackedColumn>
  </SliceContainer>
));

export default Secondary2And2;
