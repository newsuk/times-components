import React, { useState } from 'react';

import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { SaveStarUI, ArticleBookmark } from './SaveStarUI';

export const SaveStar: React.FC<{
  articleId: string;
  isPreviewMode?: boolean;
}> = ({ articleId, isPreviewMode }) => {
  const [url, setUrl] = useState<string>(
    `/api/collections/is-bookmarked/${articleId}`
  );

  const [previewData, setPreviewData] = useState<ArticleBookmark | undefined>(
    isPreviewMode ? { isBookmarked: false } : undefined
  );

  const onToggleSave = (articleId: string, isSaved: boolean) => {
    if (isPreviewMode) {
      setPreviewData({ isBookmarked: !isSaved });
    } else {
      setUrl(
        isSaved
          ? `/api/collections/delete/${articleId}`
          : `/api/collections/save/${articleId}`
      );
    }
  };

  return (
    <FetchProvider
      url={url}
      options={{ credentials: 'same-origin' }}
      previewData={previewData}
    >
      <SaveStarUI articleId={articleId} onToggleSave={onToggleSave} />
    </FetchProvider>
  );
};
