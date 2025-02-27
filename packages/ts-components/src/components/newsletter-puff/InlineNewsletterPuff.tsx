import React from 'react';

import { useFetch } from '../../helpers/fetch/FetchProvider';

export const InlineNewsletterPuff = ({ section }: { section: string }) => {
  const { loading, error, data } = useFetch<any>();

  return (
    <div>
      <span>InlineNewsletterPuff</span>
      <span>{loading}</span>
      <span>{error}</span>
      <span>{JSON.stringify(data)}</span>
      <span>{section}</span>
    </div>
  );
};
