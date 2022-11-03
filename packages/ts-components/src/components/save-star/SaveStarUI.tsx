import React, { useCallback, useEffect, useState } from 'react';
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
  const [isLoading, setIsSavedLoading] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { loading, data } = useFetch<ArticleBookmark>();

  useEffect(
    () => {
      setIsSavedLoading(loading);
      setIsSaved(data ? data.isBookmarked : false);
    },
    [loading, data]
  );

  const toggleSave = useCallback(
    async () => {
      onToggleSave(articleId, isSaved);
    },
    [articleId, isSaved]
  );

  if (isLoading) {
    return (
      <>
        <SaveStarText>{getText(false)}</SaveStarText>
        <IconContainer>
          <LoadingIcon />
        </IconContainer>
      </>
    );
  }

  return (
    <>
      <SaveStarText>{getText(isSaved)}</SaveStarText>
      <SaveStarButton onClick={toggleSave}>
        <IconContainer>
          <IconStar
            height={18}
            title={getIconTitle(isSaved)}
            fillColour={getIconFillColour(isSaved)}
            strokeColour={colours.functional.secondary}
          />
        </IconContainer>
      </SaveStarButton>
    </>
  );
};
