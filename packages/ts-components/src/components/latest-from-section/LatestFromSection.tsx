import React, { FC } from 'react';
import RelatedArticles from '@times-components/related-articles';

import { RelatedArticles as RelatedArticlesType } from '../related-article-slice/types';
import { formatLatesetFromSection } from './formatters';

type Props = {
  latestFromSection: any[];
  section: string;
  analyticsStream: (evt: any) => void;
};
export const LatestFromSection: FC<Props> = ({
  section,
  analyticsStream,
  latestFromSection
}) => {
  const relatedArticles = formatLatesetFromSection(latestFromSection, section);

  const slice: RelatedArticlesType = {
    sliceName: 'StandardSlice',
    items: relatedArticles
  };

  return (
    <RelatedArticles
      heading={`Latest from ${section}`}
      analyticsStream={analyticsStream}
      isVisible
      slice={slice}
    />
  );
};
