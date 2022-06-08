import React, { useEffect, useState } from 'react';

import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { RecommendedArticles } from './RecommendedArticles';

export const RecommendedFetch: React.FC<{
  articleId: string;
  section: string;
  isVisible?: boolean;
  analyticsStream?: (evt: any) => void;
}> = ({ articleId, section, isVisible, analyticsStream }) => {
  const [isClientSide, setIsClientSide] = useState<boolean>(false);

  useEffect(() => {
    setIsClientSide(true);
  });

  return isClientSide ? (
    <FetchProvider url={`/api/recommended-articles/${articleId}`}>
      <RecommendedArticles
        section={section}
        isVisible={isVisible}
        analyticsStream={analyticsStream}
      />
    </FetchProvider>
  ) : null;
};
