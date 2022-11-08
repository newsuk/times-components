import React from 'react';
import { colours } from '@times-components/ts-styleguide';
import { IconStar } from '@times-components/icons';

import { useFetch } from '../../helpers/fetch/FetchProvider';

import {
  IconContainer,
  LoadingIcon,
  SaveStarText,
  SaveStarButton
} from './styles';

export type ArticleBookmark = {
  isBookmarked: boolean;
};

const getText = (isSaved: boolean) => (isSaved ? 'Saved' : 'Save');

const getIconTitle = (isSaved: boolean) =>
  isSaved ? 'Remove from My Articles' : 'Save to My Articles';

const getIconFillColour = (isSaved: boolean) =>
  isSaved ? colours.functional.action : colours.functional.white;

export const SaveStarUI: React.FC<{
  articleId: string;
  onToggleSave: (id: string, isSaved: boolean) => void;
}> = ({ articleId, onToggleSave }) => {
  const { loading, error, data } = useFetch<ArticleBookmark>();

  if (loading) {
    return (
      <>
        <SaveStarText>{getText(false)}</SaveStarText>
        <IconContainer>
          <LoadingIcon />
        </IconContainer>
      </>
    );
  }

  if (error || !data) {
    return null;
  }

  return (
    <>
      <SaveStarText>{getText(data.isBookmarked)}</SaveStarText>
      <SaveStarButton
        onClick={() => onToggleSave(articleId, data.isBookmarked)}
      >
        <IconContainer>
          <IconStar
            height={18}
            title={getIconTitle(data.isBookmarked)}
            fillColour={getIconFillColour(data.isBookmarked)}
            strokeColour={colours.functional.secondary}
          />
        </IconContainer>
      </SaveStarButton>
    </>
  );
};
