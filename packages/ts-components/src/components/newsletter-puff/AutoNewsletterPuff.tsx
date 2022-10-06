import React from 'react';
import { ViewCountWrapper } from '../../helpers/view-count-wrapper/ViewCountWrapper';
import { InlineNewsletterPuff } from './InlineNewsletterPuff';

export const AutoNewsletterPuff = ({
  code,
  copy,
  headline,
  sectionColour
}: AutoNewsletterPuffProps) => (
  <ViewCountWrapper
    trackingName={`auto-puff-${code}`}
    displayFunction={count => count !== undefined && [1, 3, 5].includes(count)}
  >
    <InlineNewsletterPuff
      code={code}
      copy={copy}
      headline={headline}
      sectionColour={sectionColour}
    />
  </ViewCountWrapper>
);

type AutoNewsletterPuffProps = {
  code: string;
  copy: string;
  headline: string;
  sectionColour?: string;
};
