import { Divider, GridLayout, Hidden, Visible } from 'newskit';
import React from 'react';
import {
  CommentCard,
  CommentCardProps
} from '../../components/slices/comment-card';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { AvatarDivider } from '../shared-styles';
import { ClickHandlerType } from '../types';

interface CommentStackProps {
  comments: CommentCardProps[];
  clickHandler: ClickHandlerType;
}
export const CommentStack = ({ comments, clickHandler }: CommentStackProps) => {
  return (
    <>
      <FullWidthBlock
        id="COMMENT STACK"
        paddingInline={{
          xs: 'space045',
          md: 'space000'
        }}
      >
        <Visible xs sm>
          <Divider
            overrides={{
              marginBlock: 'space040',
              stylePreset: 'lightDashedDivider'
            }}
          />
        </Visible>
        <Hidden xs sm>
          <Divider
            overrides={{
              marginBlock: 'space040',
              stylePreset: 'dashedDivider'
            }}
          />
        </Hidden>
      </FullWidthBlock>
      <GridLayout
        columns={{
          xs: '1fr',
          md: '1fr 1px 1fr'
        }}
        columnGap="space040"
      >
        {comments.map((comment, commentIndex, commentArr) => {
          const hasBorder = commentIndex < commentArr.length - 1 && (
            <>
              <Visible xs sm>
                <AvatarDivider
                  overrides={{
                    marginBlock: 'space040',
                    stylePreset: 'lightDashedDivider'
                  }}
                />
              </Visible>
              <Hidden xs sm>
                <AvatarDivider
                  overrides={{
                    marginBlock: 'space000',
                    stylePreset: 'lightDivider'
                  }}
                  vertical
                />
              </Hidden>
            </>
          );

          return (
            <React.Fragment key={comment.headline}>
              <CommentCard article={comment} clickHandler={clickHandler} />
              {hasBorder}
            </React.Fragment>
          );
        })}
      </GridLayout>
    </>
  );
};
