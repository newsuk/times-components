import React, { useState } from 'react';

import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { InlineNewsletterPuff } from './InlineNewsletterPuff';

export const NewsletterProvider = ({
  code,
  section
}: {
  code: string;
  section: string;
}) => {
  const [url, setUrl] = useState<string>(
    `/api/is-subscribed-newsletter/${code}`
  );

  return (
    <FetchProvider url={url} options={{ credentials: 'same-origin' }}>
      <InlineNewsletterPuff section={section} setUrl={setUrl} />
    </FetchProvider>
  );
};
