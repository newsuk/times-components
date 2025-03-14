import React from 'react';
import { ViewCountWrapper } from '../../helpers/view-count-wrapper/ViewCountWrapper';
import { InlineNewsletterPuff } from './InlineNewsletterPuff';

export const AutoNewsletterPuff = ({
  code,
  description,
  title,
  section
}: AutoNewsletterPuffProps) => (
  <ViewCountWrapper
    trackingName={`auto-puff-${code}`}
    displayFunction={count => count !== undefined && [1, 3, 5].includes(count)}
  >
    <InlineNewsletterPuff
      code={code}
      description={description}
      title={title}
      section={section}
    />
  </ViewCountWrapper>
);

type AutoNewsletterPuffProps = {
  code: string;
  section: string;
  description: string;
  title: string;
};
