import React, { useEffect, useState } from 'react';

import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import { RecommendedArticles } from './RecommendedArticles';

export const RecommendedFetch: React.FC<{
  articleId: string;
  articleHeadline: string;
  articleSection: string;
  isVisible?: boolean;
  analyticsStream?: (evt: any) => void;
}> = ({
  articleId,
  articleHeadline,
  articleSection,
  isVisible,
  analyticsStream
}) => {
  const [isClientSide, setIsClientSide] = useState<boolean>(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  const heading = `Today's ${articleSection}`;

  return isClientSide ? (
    <FetchProvider
      url={`/api/recommended-articles/${articleId}/todays_section`}
    >
      <TrackingContextProvider
        context={{
          object: 'RecommendedArticles',
          attrs: {
            event_navigation_action: 'navigation',
            event_navigation_name: 'widget : relevant article',
            event_navigation_browsing_method: 'click',
            section_details: `section : ${articleSection}`,
            article_name: articleHeadline,
            widget_headline: heading.toLowerCase(),
            widget_section: articleSection,
            widget_type: "today's section"
          }
        }}
      >
        <RecommendedArticles
          heading={heading}
          isVisible={isVisible}
          analyticsStream={analyticsStream}
        />
      </TrackingContextProvider>
    </FetchProvider>
  ) : null;
};
