// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import { Divider, GridLayout, Visible } from 'newskit';
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
        paddingInline={{
          xs: 'space045',
          md: 'space000'
        }}
      >
        <Divider
          overrides={{
            marginBlock: 'space040',
            stylePreset: { xs: 'lightDashedDivider', md: 'dashedDivider' }
          }}
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
              <CommentCard article={comment} clickHandler={clickHandler} />
              {hasBorder}
            </React.Fragment>
          );
        })}
      </GridLayout>
    </>
  );
};
