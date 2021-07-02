import React, { FC } from 'react';
import RelatedArticles from '@times-components/related-articles';

import { RelatedArticleSliceType } from '../../types/related-article-slice';
import {
  formatLatestFromSection,
  getSectionTitle,
  LatestSection
} from './formatters';

type Props = {
  latestFromSection: LatestSection[];
  section: string;
  analyticsStream: (evt: any) => void;
};
export const LatestFromSection: FC<Props> = ({
  section,
  analyticsStream,
  latestFromSection
}) => {
  const relatedArticles = formatLatestFromSection(latestFromSection, section);

  const slice: RelatedArticleSliceType = {
    sliceName: 'StandardSlice',
    items: relatedArticles
      ? relatedArticles.map(article => ({ leadAsset: null, article }))
      : []
  };

  return (
    <RelatedArticles
      heading={`Latest from ${getSectionTitle(latestFromSection, section)}`}
      analyticsStream={analyticsStream}
      isVisible
      slice={slice}
    />
  );
};
