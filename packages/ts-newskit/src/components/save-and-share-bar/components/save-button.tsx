import React from 'react';
import { StyledButton, IconActivityIndicatorContainer } from './styled';
// @ts-ignore
import { IconActivityIndicator } from '@times-components/icons';
import { Bookmark } from '@emotion-icons/bootstrap/Bookmark';
import { BookmarkFill } from '@emotion-icons/bootstrap/BookmarkFill';

import type { SaveButtonProps } from '../types';

export const SaveButton = (props: SaveButtonProps) => {

  if (props.loading) {
    return (
      <StyledButton
        size="small"
        overrides={{ stylePreset: 'buttonOutlinedPrimary' }}
      >
        <IconActivityIndicatorContainer>
          <IconActivityIndicator size="small" fillColor="#333333" />
        </IconActivityIndicatorContainer>
      </StyledButton>
    );
  }

  if (props.error || !props.data || props?.data?.isBookmarked === undefined) return null;

  const { isBookmarked } = props.data;

  return (
    <>
      <StyledButton
        size="small"
        overrides={{ stylePreset: 'buttonOutlinedPrimary' }}
        onClick={() => props.onToggleSave(props.articleId, isBookmarked)}
      >
        {!isBookmarked ? (
          <Bookmark style={{ height: 14, width: 14 }} />
        ) : (
          <BookmarkFill style={{ height: 14, width: 14 }} />
        )}
        {!isBookmarked ? 'Save' : 'Saved'}
      </StyledButton>
    </>
  );
};
