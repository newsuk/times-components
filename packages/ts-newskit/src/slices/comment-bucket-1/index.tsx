import React from 'react';
import { ClickHandlerType } from '../types';
import { Divider, GridLayout, Visible } from 'newskit';
import { AvatarDivider } from '../shared-styles';
import {
  CommentCard,
  CommentCardProps
} from '../../components/slices/comment-card';
export interface CommentStackProps {
  clickHandler: ClickHandlerType;
  data: CommentCardProps[];
}

export const CommentBucket1 = ({ data, clickHandler }: CommentStackProps) => (
  <>
    <Divider
      overrides={{
        marginBlockEnd: 'space040',
        stylePreset: { xs: 'lightDashedDivider', md: 'dashedDivider' }
      }}
    />
    <GridLayout
      columns={{
        xs: '1fr',
        md: '1fr 1px 1fr 1px 1fr'
      }}
      columnGap="space040"
    >
      {data.map((comment, commentIndex, commentArr) => {
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
            <Visible md lg xl>
              <AvatarDivider
                overrides={{
                  marginBlock: 'space000',
                  stylePreset: 'lightDivider'
                }}
                vertical
              />
            </Visible>
          </>
        );

        return (
          <React.Fragment key={comment.headline}>
            <CommentCard
              article={comment}
              clickHandler={clickHandler}
              isCommentBucket1={true}
            />
            {hasBorder}
          </React.Fragment>
        );
      })}
    </GridLayout>
  </>
);
