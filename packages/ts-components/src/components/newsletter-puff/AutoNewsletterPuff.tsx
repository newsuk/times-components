import React from 'react';
import { ViewCountWrapper } from '../../helpers/view-count-wrapper/ViewCountWrapper';
import { InlineNewsletterPuff } from './InlineNewsletterPuff';

export const AutoNewsletterPuff = ({
  code,
  copy,
  section
}: AutoNewsletterPuffProps) => (
  <ViewCountWrapper
    trackingName={`auto-puff-${code}`}
    displayFunction={count => count !== undefined && [1, 3, 5].includes(count)}
  >
    <InlineNewsletterPuff
      code={code}
      copy={copy}
      headline={"ibrahim testing newsletter title"}
      section={section}
    />
  </ViewCountWrapper>
);

type AutoNewsletterPuffProps = {
  code: string;
  copy: string;
  headline?: string;
  section: string;
};
