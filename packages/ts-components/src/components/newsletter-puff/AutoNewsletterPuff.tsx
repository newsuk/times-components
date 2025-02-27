import React from 'react';
import { ViewCountWrapper } from '../../helpers/view-count-wrapper/ViewCountWrapper';
import { NewsletterProvider } from './NewsletterProvider';

export const AutoNewsletterPuff = ({
  code,
  copy,
  headline,
  section
}: AutoNewsletterPuffProps) => (
  <ViewCountWrapper
    trackingName={`auto-puff-${code}`}
    displayFunction={count => count !== undefined && [1, 3, 5].includes(count)}
  >
    <NewsletterProvider code={code} section={section} />
  </ViewCountWrapper>
);

type AutoNewsletterPuffProps = {
  code: string;
  copy: string;
  headline: string;
  section: string;
};
