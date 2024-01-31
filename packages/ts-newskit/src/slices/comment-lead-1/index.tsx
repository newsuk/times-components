import React from 'react';
import { ClickHandlerType } from '../types';
import { Divider, GridLayout } from 'newskit';
import { AvatarDivider } from '../shared-styles';
import {
  CommentCard,
  CommentCardProps
} from '../../components/slices/comment-card';
import { CustomBlockLayout } from '../shared';
export interface CommentStackProps {
  clickHandler: ClickHandlerType;
  data: CommentCardProps[];
}

export const CommentLead1 = ({ data, clickHandler }: CommentStackProps) => (
  <CustomBlockLayout>
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
          <AvatarDivider
            overrides={{
              marginBlock: { xs: 'space040', md: 'space000' },
              stylePreset: {
                xs: 'lightDashedDivider',
                md: 'commentCardlightDivider'
              }
            }}
          />
        );

        return (
          <React.Fragment key={comment.headline}>
            <CommentCard
              article={comment}
              clickHandler={clickHandler}
              isCommentLead1
            />
            {hasBorder}
          </React.Fragment>
        );
      })}
    </GridLayout>
  </CustomBlockLayout>
);
