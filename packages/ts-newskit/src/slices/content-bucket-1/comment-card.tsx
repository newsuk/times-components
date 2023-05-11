import { Divider, Stack } from 'newskit';
import React from 'react';
import {
  CommentCard,
  CommentCardProps
} from '../../components/slices/comment-card';
import { AvatarDivider } from '../shared-styles';

interface CommentStackProps {
  comments: CommentCardProps[];
}
export const CommentStack = ({ comments }: CommentStackProps) => {
  return (
    <>
      <Divider
        overrides={{ marginBlock: 'space040', stylePreset: 'dashedDivider' }}
      />
      <Stack
        flow={{ xs: 'vertical-left', md: 'horizontal-center' }}
        stackDistribution="space-evenly"
      >
        {comments.map((comment, commentIndex, commentArr) => {
          const hasBorder = commentIndex < commentArr.length - 1 && (
            <AvatarDivider
              overrides={{
                marginInline: { md: 'space040' },
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
      </Stack>
    </>
  );
};
