import React, { cloneElement, useCallback, useMemo, useState } from 'react';
import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { SaveStarUI, ArticleBookmark } from './SaveStarUI';
import { ContentProvider } from './ContentProvider';
// Test
export const SaveStar: React.FC<{
  articleId: string;
  isPreviewMode?: boolean;
}> = React.memo(({ articleId, isPreviewMode, children }) => {
  const [url, setUrl] = useState<string>(
    `/api/collections/is-bookmarked/${articleId}`
  );

  const [previewData, setPreviewData] = useState<ArticleBookmark | undefined>(
    isPreviewMode ? { isBookmarked: false } : undefined
  );

  const fetchOptions = useMemo(() => ({ credentials: 'same-origin' }), []);

  const onToggleSave = useCallback((id: string, isSaved: boolean) => {
    if (isPreviewMode) {
      setPreviewData({ isBookmarked: !isSaved });
    } else {
      setUrl(
        isSaved
          ? `/api/collections/delete/${id}`
          : `/api/collections/save/${id}`
      );
    }
  }, []);

  const Content = children ? (
    cloneElement(children as React.ReactElement, {
      articleId,
      onToggleSave
    })
  ) : (
    <SaveStarUI articleId={articleId} onToggleSave={onToggleSave} />
  );

  return (
    <FetchProvider url={url} options={fetchOptions} previewData={previewData}>
      <ContentProvider>{Content}</ContentProvider>
    </FetchProvider>
  );
});
