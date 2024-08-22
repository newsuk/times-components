import React from 'react';
import { useFetch } from '../../helpers/fetch/FetchProvider';
import { ArticleBookmark, ContentProps } from './types';

export const ContentProvider: React.FC = React.memo(({ children }) => {
  const fetchResponse = useFetch<ArticleBookmark>();
  return (
    <>
      {React.isValidElement<ContentProps>(children) &&
        React.cloneElement(children, fetchResponse)}
    </>
  );
});
