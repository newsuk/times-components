import React from 'react';
import { ViewCountWrapper } from '../../helpers/view-count-wrapper/ViewCountWrapper';
import { InlineNewsletterPuff } from './InlineNewsletterPuff';

export const AutoNewsletterPuff = ({
  analyticsStream,
  code,
  copy,
  headline,
  imageUri,
  label
}: AutoNewsletterPuffProps) => (
  <ViewCountWrapper
    trackingName={`auto-puff-${code}`}
    displayFunction={count => count !== undefined && [1, 3, 7].includes(count)}
  >
    <div style={{ display: 'none' }}>
      <InlineNewsletterPuff
        analyticsStream={analyticsStream}
        code={code}
        copy={copy}
        headline={headline}
        imageUri={imageUri}
        label={label}
      />
    </div>
  </ViewCountWrapper>
);

type AutoNewsletterPuffProps = {
  analyticsStream: (data: any) => void;
  code: string;
  copy: string;
  headline: string;
  imageUri: string;
  label?: string;
};
