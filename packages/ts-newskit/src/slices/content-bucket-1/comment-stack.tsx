import { Divider, GridLayout } from 'newskit';
import React from 'react';
import {
  CommentCard,
  CommentCardProps
} from '../../components/slices/comment-card';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { AvatarDivider } from '../shared-styles';

interface CommentStackProps {
  comments: CommentCardProps[];
}
export const CommentStack = ({ comments }: CommentStackProps) => {
  return (
    <>
      <FullWidthBlock>
        <Divider
          overrides={{ marginBlock: 'space040', stylePreset: 'dashedDivider' }}
        />
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
            <AvatarDivider
              overrides={{
                marginBlock: { xs: 'space040', md: 'space000' },
                stylePreset: 'lightDivider'
              }}
              vertical={{ xs: false, md: true }}
            />
          );

          return (
            <React.Fragment key={comment.heading}>
              <CommentCard {...comment} />
              {hasBorder}
            </React.Fragment>
          );
        })}
      </GridLayout>
    </>
  );
};
