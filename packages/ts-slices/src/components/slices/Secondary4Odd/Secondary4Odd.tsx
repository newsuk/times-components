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
  SlotContainerLarge,
  SlotContainerSmall
} from './styles';

const Secondary4Odd: React.FC<{
  slice: SliceData;
  styles?: SliceStyle;
  clickHandler?: ClickHandlerType;
}> = React.memo(({ slice, styles, clickHandler }) => (
  <SliceContainer styles={styles}>
    {[...Array(2)].fill(null).map((__, i) => {
      const large = get(slice, `children[${i * 2}].article`);
      const small = get(slice, `children[${i * 2 + 1}].article`);

      return (
        <React.Fragment key={i}>
          <SlotContainerLarge styles={styles}>
            <Article
              article={large}
              displaySchema={setDisplaySchema({
                sm: { imageRatio: '3:2', headlineFontSize: 22 },
                xlg: { headlineFontSize: 24 }
              })}
              clickHandler={clickHandler}
            />
          </SlotContainerLarge>

          <SlotContainerSmall styles={styles}>
            {isCommentArticle(small) ? (
              <ArticleComment
                article={small}
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
                  lg: { isSideBySide: false },
                  xlg: { headlineFontSize: 18 }
                })}
                clickHandler={clickHandler}
              />
            ) : (
              <Article
                article={small}
                displaySchema={setDisplaySchema({
                  sm: {
                    isImageHidden: true,
                    imageRatio: '3:2',
                    headlineFontSize: 18
                  },
                  md: {
                    isImageHidden: false,
                    isSideBySide: true,
                    headlineFontSize: 16
                  },
                  lg: { isSideBySide: false },
                  xlg: { headlineFontSize: 18 }
                })}
                clickHandler={clickHandler}
              />
            )}
          </SlotContainerSmall>
        </React.Fragment>
      );
    })}
  </SliceContainer>
));

export default Secondary4Odd;
