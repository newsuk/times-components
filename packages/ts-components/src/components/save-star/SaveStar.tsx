import React, { useState } from 'react';

import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { SaveStarUI, ArticleBookmark } from './SaveStarUI';

export const SaveStar: React.FC<{
  articleId: string;
  isPreviewMode?: boolean;
}> = React.memo(({ articleId, isPreviewMode }) => {
  const [url, setUrl] = useState<string>(
    `/api/collections/is-bookmarked/${articleId}`
  );

  const [previewData, setPreviewData] = useState<ArticleBookmark | undefined>(
    isPreviewMode ? { isBookmarked: false } : undefined
  );

  const onToggleSave = (id: string, isSaved: boolean) => {
    // tslint:disable-next-line:no-console
    console.log('SaveStar onToggleSave', id, isSaved);

    if (isPreviewMode) {
      // tslint:disable-next-line:no-console
      console.log('SaveStar onToggleSave setPreviewData');

      setPreviewData({ isBookmarked: !isSaved });
    } else {
      // tslint:disable-next-line:no-console
      console.log('SaveStar onToggleSave save/delete');

      setUrl(
        isSaved
          ? `/api/collections/delete/${id}`
          : `/api/collections/save/${id}`
      );
    }
  };

  // tslint:disable-next-line:no-console
  console.log('SaveStar render', url, previewData);

  return (
    <FetchProvider
      url={url}
      options={{ credentials: 'same-origin' }}
      previewData={previewData}
    >
      <SaveStarUI articleId={articleId} onToggleSave={onToggleSave} />
    </FetchProvider>
  );
});
